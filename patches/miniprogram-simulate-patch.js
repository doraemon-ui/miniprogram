const path = require('path')
const fs = require('fs')
const simulatePackageDir = path.dirname(require.resolve('miniprogram-simulate/package.json'))
const resolveFromSimulate = (id) => require.resolve(id, { paths: [simulatePackageDir] })
const jComponent = require(resolveFromSimulate('j-component'))
const jComponentUtils = require(resolveFromSimulate('j-component/src/tool/utils'))
const compile = require(path.join(simulatePackageDir, 'src/compile'))
const wxss = require(path.join(simulatePackageDir, 'src/wxss'))
const simulateUtils = require(path.join(simulatePackageDir, 'src/utils'))

/**
 * 为 miniprogram-simulate 添加组件缓存共享功能。
 *
 * miniprogram-simulate 原始 load 每次都会创建一个局部 hasRegisterCache。
 * 父子组件被分别 load 时，同一个文件会得到多个不同 id，relations 里的 target
 * 也只能在当前 load 的局部 pathToIdMap 里解析，导致 getRelationNodes 返回空。
 */
class SimulatePatch {
  constructor(simulate) {
    this.simulate = simulate
    this._cache = new Map()
    this._pathToId = new Map()
    this._idToPath = new Map()
    this._componentMap = new Map()
    this._originalLoad = simulate.load.bind(simulate)
    this._originalRender = simulate.render.bind(simulate)
    this._patched = false
  }

  /**
   * 应用补丁
   */
  apply() {
    if (this._patched) return

    this._originalLoad = this.simulate.load.bind(this.simulate)
    this._originalRender = this.simulate.render.bind(this.simulate)

    this.simulate.load = this._patchedLoad.bind(this)
    this.simulate.render = this._patchedRender.bind(this)

    this.simulate.clearCache = this.clearCache.bind(this)
    this.simulate.getCache = this.getCache.bind(this)
    this.simulate.hasCache = this.hasCache.bind(this)
    this.simulate.restore = this.restore.bind(this)

    this._patched = true
  }

  /**
   * 恢复原始方法
   */
  restore() {
    if (!this._patched) return
    this.simulate.load = this._originalLoad
    this.simulate.render = this._originalRender
    delete this.simulate.clearCache
    delete this.simulate.getCache
    delete this.simulate.hasCache
    delete this.simulate.restore
    this._patched = false
  }

  /**
   * 清除缓存
   * @param {string} key - 可选的缓存键，不传则清空所有
   */
  clearCache(key) {
    if (key) {
      this._cache.delete(key)
      return
    }

    this._cache.clear()
    this._pathToId.clear()
    this._idToPath.clear()
    this._componentMap.clear()
  }

  /**
   * 获取缓存信息
   */
  getCache() {
    return {
      size: this._cache.size,
      keys: Array.from(this._cache.keys()),
      paths: Array.from(this._pathToId.keys()),
    }
  }

  /**
   * 检查是否有缓存
   */
  hasCache(key) {
    return this._cache.has(key)
  }

  /**
   * 生成缓存键
   */
  _getCacheKey(componentPath, tagName, options) {
    const { less, rootPath, compiler, ...cacheOptions } = options || {}
    return `${this._normalizeComponentPath(componentPath)}|${tagName}|${JSON.stringify(cacheOptions)}`
  }

  _normalizeComponentPath(componentPath) {
    return path.normalize(componentPath)
  }

  _resolveUsingPath(componentPath, usingPath, rootPath) {
    if (simulateUtils.isAbsolute(usingPath)) {
      return path.join(rootPath, usingPath)
    }
    return path.join(path.dirname(componentPath), usingPath)
  }

  _readJson(jsonPath) {
    try {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (err) {
      return null
    }
  }

  _createLoadSession(options) {
    return {
      wxss: [],
      options,
      needRunJsList: [],
    }
  }

  /**
   * 使用全局 path->id 注册表递归注册组件。
   */
  _registerWithSharedCache(componentPath, tagName, loadSession) {
    window.__webview_engine_version__ = 0.02

    const normalizedPath = this._normalizeComponentPath(componentPath)
    if (this._pathToId.has(normalizedPath)) {
      return this._pathToId.get(normalizedPath)
    }

    const id = simulateUtils.getId()
    this._pathToId.set(normalizedPath, id)
    this._idToPath.set(id, normalizedPath)

    const json = this._readJson(`${componentPath}.json`)
    if (!json) {
      throw new Error(`invalid componentPath: ${componentPath}`)
    }

    const component = {
      id,
      path: componentPath,
      tagName,
      json,
    }

    const rootPath = loadSession.options.rootPath
    const usingComponents = component.json.usingComponents || {}
    const overrideUsingComponents = loadSession.options.usingComponents || {}
    Object.assign(usingComponents, overrideUsingComponents)

    Object.keys(usingComponents).forEach((key) => {
      const usingPath = usingComponents[key]
      const absolutePath = this._resolveUsingPath(componentPath, usingPath, rootPath)

      if (fs.existsSync(`${absolutePath}.json`)) {
        const depId = this._registerWithSharedCache(absolutePath, key, loadSession)
        usingComponents[key] = depId
      }
    })

    component.wxml = compile.getWxml(componentPath, loadSession.options)
    component.wxss = wxss.getContent(`${componentPath}.wxss`)

    loadSession.needRunJsList.push([componentPath, component])
    loadSession.wxss.push(
      wxss.compile(component.wxss, {
        prefix: tagName,
        ...loadSession.options,
      }),
    )

    return component.id
  }

  _createComponentDefinition(component, options) {
    return Object.assign(
      {
        id: component.id,
        path: component.path,
        template: component.wxml,
        usingComponents: component.json.usingComponents,
        tagName: component.tagName,
      },
      options,
    )
  }

  _resolveRelationPath(componentPath, relationKey) {
    const relationPath = simulateUtils.isAbsolute(relationKey) ? relationKey : path.join(path.dirname(componentPath), relationKey)
    return this._normalizeComponentPath(relationPath)
  }

  _patchRelationDefinitions(componentPath, relations) {
    if (!relations) return

    Object.keys(relations).forEach((key) => {
      const value = relations[key]
      const relationPath = this._resolveRelationPath(componentPath, key)
      const id = this._pathToId.get(relationPath)

      if (id && key !== id) {
        value.target = id
        relations[id] = value
        delete relations[key]
      }
    })
  }

  _runComponentJs(loadSession) {
    const originalComponent = global.Component

    global.Component = (options) => {
      const component = this._nowLoad
      const definition = this._createComponentDefinition(component, options)

      definition.options = Object.assign(
        {
          classPrefix: component.tagName,
        },
        definition.options || {},
      )

      this._patchRelationDefinitions(component.path, definition.relations)
      jComponent.register(definition)
    }

    try {
      loadSession.needRunJsList.forEach((item) => {
        this._nowLoad = item[1]
        simulateUtils.runJs(item[0])
        this._nowLoad = null
      })
    } finally {
      this._nowLoad = null
      global.Component = originalComponent
    }
  }

  _repairRegisteredRelations() {
    this._pathToId.forEach((id, componentPath) => {
      const manager = jComponentUtils.cache(id)
      const behavior = manager && manager.exparserDef && manager.exparserDef.behavior

      if (behavior && behavior.relations) {
        this._patchRelationDefinitions(componentPath, behavior.relations)
      }
    })
  }

  /**
   * 递归加载组件及其依赖（共享缓存版）。
   */
  _loadWithSharedCache(componentPath, tagName, options) {
    const loadSession = this._createLoadSession(options)
    const id = this._registerWithSharedCache(componentPath, tagName, loadSession)

    this._runComponentJs(loadSession)
    this._repairRegisteredRelations()

    this._componentMap.set(id, loadSession)

    return id
  }

  /**
   * 补丁后的 load 方法
   */
  _patchedLoad(componentPath, tagName, options = {}) {
    const { shareCache = false, ...restOptions } = options

    if (!shareCache || typeof componentPath !== 'string') {
      return this._originalLoad(componentPath, tagName, options)
    }

    const normalizedOptions = Object.assign(
      {
        compiler: 'official',
        rootPath: path.dirname(componentPath),
      },
      restOptions,
    )
    const cacheKey = this._getCacheKey(componentPath, tagName, normalizedOptions)

    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey)
    }

    const id = this._loadWithSharedCache(componentPath, tagName, normalizedOptions)
    this._cache.set(cacheKey, id)

    return id
  }

  /**
   * 补丁后的 render 方法，为共享缓存注册的组件补注入 wxss。
   */
  _patchedRender(id, properties) {
    const loadSession = this._componentMap.get(id)
    if (loadSession) {
      wxss.insert(loadSession.wxss, id)
    }
    return this._originalRender(id, properties)
  }
}

module.exports = SimulatePatch
