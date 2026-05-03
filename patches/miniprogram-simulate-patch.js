const path = require('path')
const fs = require('fs')

/**
 * 为 miniprogram-simulate 添加组件缓存共享功能
 * 不修改原始源码，通过 Monky Patch 实现
 */
class SimulatePatch {
  constructor(simulate) {
    this.simulate = simulate
    this._cache = new Map() // 全局组件缓存
    this._originalLoad = simulate.load.bind(simulate)
    this._originalRegister = null
    this._patched = false
  }

  /**
   * 应用补丁
   */
  apply() {
    if (this._patched) return

    // 保存原始引用
    this._originalLoad = this.simulate.load.bind(this.simulate)

    // 替换 load 方法
    this.simulate.load = this._patchedLoad.bind(this)

    // 添加辅助方法
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
    } else {
      this._cache.clear()
    }
  }

  /**
   * 获取缓存信息
   */
  getCache() {
    return {
      size: this._cache.size,
      keys: Array.from(this._cache.keys()),
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
    // 忽略 compiler 和 rootPath 等不影响组件定义的选项
    const { less, ...cacheOptions } = options || {}
    return `${componentPath}|${tagName}|${JSON.stringify(cacheOptions)}`
  }

  /**
   * 递归加载组件及其依赖（共享缓存版）
   */
  _loadWithSharedCache(componentPath, tagName, options, parentCache = null) {
    const currentCache = parentCache || new Map()
    const cacheKey = this._getCacheKey(componentPath, tagName, options)

    // 检查缓存
    if (currentCache.has(cacheKey)) {
      return currentCache.get(cacheKey)
    }

    // 读取组件的 json 配置
    const jsonPath = `${componentPath}.json`
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Component json not found: ${jsonPath}`)
    }

    const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    const usingComponents = json.usingComponents || {}

    // 先递归加载所有依赖组件（使用同一个缓存）
    const resolvedUsingComponents = {}
    const rootPath = options?.rootPath || path.dirname(componentPath)

    for (const [name, usingPath] of Object.entries(usingComponents)) {
      const absolutePath = path.isAbsolute(usingPath) ? path.join(rootPath, usingPath) : path.join(path.dirname(componentPath), usingPath)

      if (fs.existsSync(`${absolutePath}.json`)) {
        // 递归加载依赖，传递同一个缓存
        const depId = this._loadWithSharedCache(absolutePath, name, options, currentCache)
        resolvedUsingComponents[name] = depId
      }
    }

    // 临时修改 json 内容，让原始 load 使用已解析的 usingComponents
    const originalJsonContent = fs.readFileSync(jsonPath, 'utf-8')
    const modifiedJson = { ...json, usingComponents: resolvedUsingComponents }

    // 创建临时 json 文件
    const tempJsonPath = `${jsonPath}.temp`
    fs.writeFileSync(tempJsonPath, JSON.stringify(modifiedJson), 'utf-8')

    try {
      // 备份原始 json 内容
      const backupPath = `${jsonPath}.backup`
      fs.copyFileSync(jsonPath, backupPath)

      // 替换为修改后的 json
      fs.copyFileSync(tempJsonPath, jsonPath)

      // 调用原始 load
      const id = this._originalLoad(componentPath, tagName, options)

      // 缓存结果
      currentCache.set(cacheKey, id)

      return id
    } finally {
      // 恢复原始 json
      if (fs.existsSync(`${jsonPath}.backup`)) {
        fs.copyFileSync(`${jsonPath}.backup`, jsonPath)
        fs.unlinkSync(`${jsonPath}.backup`)
      }
      if (fs.existsSync(tempJsonPath)) {
        fs.unlinkSync(tempJsonPath)
      }
    }
  }

  /**
   * 补丁后的 load 方法
   */
  _patchedLoad(componentPath, tagName, options = {}) {
    // 检查是否启用共享缓存
    const { shareCache = false, ...restOptions } = options

    if (!shareCache) {
      // 不共享缓存，直接调用原始方法
      return this._originalLoad(componentPath, tagName, options)
    }

    // 启用共享缓存
    const cacheKey = this._getCacheKey(componentPath, tagName, restOptions)

    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey)
    }

    // 使用共享缓存加载组件及其所有依赖
    const id = this._loadWithSharedCache(componentPath, tagName, restOptions, this._cache)
    this._cache.set(cacheKey, id)

    return id
  }
}

module.exports = SimulatePatch
