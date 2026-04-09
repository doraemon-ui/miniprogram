const path = require('path')
const fs = require('fs-extra')
const glob = require('fast-glob')
const ts = require('typescript')

module.exports = (ctx) => {
  const sourceRoot = ctx.paths.sourcePath
  const dist = path.join(ctx.paths.outputPath)
  const resolveScopeDir = () => {
    const candidates = [
      path.resolve(ctx.paths.nodeModulesPath, '@doraemon-ui'),
      path.resolve(process.cwd(), 'node_modules/@doraemon-ui'),
      path.resolve(process.cwd(), '../node_modules/@doraemon-ui'),
      path.resolve(process.cwd(), '../../node_modules/@doraemon-ui'),
    ]
    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) return candidate
    }
    return candidates[0]
  }
  const scopeDir = resolveScopeDir()
  const targetScopeDir = path.join(dist, 'miniprogram_npm/@doraemon-ui')
  const excludePackages = new Set(['cli', 'tools', 'taro-react'])
  const debug = process.env.DORAEMON_DEBUG === '1'

  const toKebab = (name) =>
    name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase()

  const readJsonIfExistsSync = (filePath) => {
    if (!fs.existsSync(filePath)) return null
    try {
      return fs.readJSONSync(filePath)
    } catch {
      return null
    }
  }

  const findUpwardFile = (startDir, fileName) => {
    let currentDir = path.resolve(startDir)
    while (true) {
      const candidate = path.join(currentDir, fileName)
      if (fs.existsSync(candidate)) return candidate
      const parentDir = path.dirname(currentDir)
      if (parentDir === currentDir) return null
      currentDir = parentDir
    }
  }

  const getPkgDepsSync = () => {
    const upwardFromCwd = findUpwardFile(process.cwd(), 'miniprogram.pkg-deps.json')
    const upwardFromPlugin = findUpwardFile(__dirname, 'miniprogram.pkg-deps.json')
    const candidatePaths = [
      path.resolve(process.cwd(), 'miniprogram.pkg-deps.json'),
      path.resolve(process.cwd(), '../miniprogram.pkg-deps.json'),
      path.resolve(process.cwd(), '../../miniprogram.pkg-deps.json'),
      path.resolve(process.cwd(), '../../../miniprogram.pkg-deps.json'),
      path.resolve(__dirname, '../miniprogram.pkg-deps.json'),
      path.resolve(__dirname, '../../miniprogram.pkg-deps.json'),
      path.resolve(__dirname, '../../../miniprogram.pkg-deps.json'),
      upwardFromCwd,
      upwardFromPlugin,
    ]
    for (const filePath of candidatePaths) {
      const json = readJsonIfExistsSync(filePath)
      if (json && typeof json === 'object') {
        if (debug) console.log('[doraemon-taro-react-plugin] pkg-deps:', filePath)
        return json
      }
    }
    if (debug) console.log('[doraemon-taro-react-plugin] pkg-deps: not found')
    return {}
  }

  const buildRefs = (pkgDeps) => {
    const dirToRef = new Map()
    const nameToDir = new Map()
    const packageToComponents = new Map()

    Object.entries(pkgDeps).forEach(([pkgName, pkgMeta]) => {
      const components = (pkgMeta && pkgMeta.components) || {}
      packageToComponents.set(pkgName, components)
      Object.entries(components).forEach(([componentKey, meta]) => {
        if (!meta || !meta.dir || !meta.src) return
        dirToRef.set(meta.dir, { packageName: pkgName, componentKey, meta })
        if (meta.name) nameToDir.set(meta.name, meta.dir)
      })
    })

    return { dirToRef, nameToDir, packageToComponents }
  }

  const collectUsedComponentDirsSync = (nameToDir) => {
    const usedDirs = new Set()
    const sourceFiles = glob.sync(`${sourceRoot}/**/*.{js,jsx,ts,tsx}`, {
      ignore: ['**/node_modules/**', '**/dist/**'],
    })

    for (const filePath of sourceFiles) {
      const code = fs.readFileSync(filePath, 'utf8')
      const scriptKind =
        filePath.endsWith('.tsx') ? ts.ScriptKind.TSX :
          filePath.endsWith('.ts') ? ts.ScriptKind.TS :
            filePath.endsWith('.jsx') ? ts.ScriptKind.JSX :
              ts.ScriptKind.JS
      const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true, scriptKind)

      const localNameToDirs = new Map()
      const localNames = new Set()
      const addLocal = (localName, dir) => {
        if (!localName || !dir) return
        const existing = localNameToDirs.get(localName) || new Set()
        existing.add(dir)
        localNameToDirs.set(localName, existing)
        localNames.add(localName)
      }

      sourceFile.forEachChild((node) => {
        if (!ts.isImportDeclaration(node)) return
        const importPath = ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : ''
        const importClause = node.importClause
        if (!importClause) return

        if (importPath === '@doraemon-ui/taro-react') {
          if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
            importClause.namedBindings.elements.forEach((spec) => {
              if (spec.isTypeOnly) return
              const importedName = (spec.propertyName && spec.propertyName.text) || spec.name.text
              const localName = spec.name.text
              const dir = nameToDir.get(importedName)
              if (dir) addLocal(localName, dir)
            })
          }
          return
        }

        const subpathMatch = importPath.match(/^@doraemon-ui\/taro-react\/components\/([a-z0-9-]+)$/)
        if (!subpathMatch) return
        const dir = subpathMatch[1]
        if (importClause.name) addLocal(importClause.name.text, dir)
        if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
          importClause.namedBindings.elements.forEach((spec) => {
            if (spec.isTypeOnly) return
            addLocal(spec.name.text, dir)
          })
        }
      })

      if (localNames.size === 0) continue

      const isImportIdentifier = (node) => {
        let current = node
        while (current) {
          if (ts.isImportClause(current) || ts.isImportSpecifier(current) || ts.isImportDeclaration(current) || ts.isNamespaceImport(current)) {
            return true
          }
          if (ts.isSourceFile(current)) return false
          current = current.parent
        }
        return false
      }

      const visit = (node) => {
        if (ts.isIdentifier(node) && localNames.has(node.text) && !isImportIdentifier(node)) {
          const dirs = localNameToDirs.get(node.text)
          if (dirs) dirs.forEach((dir) => usedDirs.add(dir))
        }
        ts.forEachChild(node, visit)
      }
      visit(sourceFile)
    }

    return usedDirs
  }

  const resolveDependencies = (initialDirs, dirToRef, packageToComponents) => {
    const resolved = new Set(initialDirs)
    const queue = [...initialDirs]

    const findSelfDepDir = (packageName, depName) => {
      const components = packageToComponents.get(packageName)
      if (!components) return null
      if (components[depName] && components[depName].dir) return components[depName].dir
      const matched = Object.entries(components).find(([key, meta]) => key === depName || meta.dir === depName || meta.src === depName)
      return matched ? matched[1].dir : null
    }

    while (queue.length > 0) {
      const currentDir = queue.shift()
      const currentRef = dirToRef.get(currentDir)
      if (!currentRef) continue

      const deps = Array.isArray(currentRef.meta.deps) ? currentRef.meta.deps : []
      for (const dep of deps) {
        let nextDir = null
        if (dep.source === 'self') {
          nextDir = findSelfDepDir(currentRef.packageName, dep.name)
        } else {
          nextDir = (dirToRef.get(dep.name) && dirToRef.get(dep.name).meta.dir) || null
        }
        if (!nextDir || resolved.has(nextDir)) continue
        resolved.add(nextDir)
        queue.push(nextDir)
      }
    }

    return resolved
  }

  const collectFallbackUsingComponentsSync = () => {
    const fallbackUsingComponents = {}
    if (!fs.existsSync(scopeDir)) return fallbackUsingComponents

    const packages = fs.readdirSync(scopeDir)
    for (const pkg of packages) {
      if (excludePackages.has(pkg)) continue
      if (!pkg.startsWith('miniprogram.')) continue

      const pkgDir = path.join(scopeDir, pkg)
      if (!fs.existsSync(pkgDir) || !fs.statSync(pkgDir).isDirectory()) continue
      const miniprogramDistDir = path.join(pkgDir, 'miniprogram_dist')
      if (!fs.existsSync(miniprogramDistDir)) continue

      const packageShortName = pkg.slice('miniprogram.'.length)
      const componentJsonFiles = glob.sync(`${miniprogramDistDir}/*.json`)
      for (const componentJsonPath of componentJsonFiles) {
        const componentJson = readJsonIfExistsSync(componentJsonPath)
        if (!componentJson || !componentJson.component) continue
        const fileName = path.basename(componentJsonPath, '.json')
        const suffix = fileName === 'index' ? '' : `-${toKebab(fileName)}`
        const componentTag = `dora-${packageShortName}${suffix}`
        fallbackUsingComponents[componentTag] = `/miniprogram_npm/@doraemon-ui/${pkg}/${fileName}`
      }
    }
    return fallbackUsingComponents
  }

  const copyPackageDist = async (packageName) => {
    const fullPkgName = packageName === 'style' ? 'style' : `miniprogram.${packageName}`
    const pkgDir = path.join(scopeDir, fullPkgName)
    if (!(await fs.pathExists(pkgDir))) return false
    const stat = await fs.stat(pkgDir)
    if (!stat.isDirectory()) return false
    const miniprogramDistDir = path.join(pkgDir, 'miniprogram_dist')
    if (!(await fs.pathExists(miniprogramDistDir))) return false
    await fs.copy(miniprogramDistDir, path.join(targetScopeDir, fullPkgName))
    return true
  }

  const resolvePackageLevelDeps = (basePackages) => {
    const resolved = new Set(basePackages)
    const queue = [...basePackages]
    const miniprogramPrefix = '@doraemon-ui/miniprogram.'

    const parseDepToPackage = (depName) => {
      if (depName.startsWith(miniprogramPrefix)) {
        return depName.slice(miniprogramPrefix.length)
      }
      if (depName === '@doraemon-ui/style') {
        return 'style'
      }
      return null
    }

    while (queue.length > 0) {
      const current = queue.shift()
      const dirName = current === 'style' ? 'style' : `miniprogram.${current}`
      const pkgJsonPath = path.join(scopeDir, dirName, 'package.json')
      const pkgJson = readJsonIfExistsSync(pkgJsonPath)
      if (!pkgJson || typeof pkgJson !== 'object') continue
      const dependencies = {
        ...(pkgJson.dependencies || {}),
        ...(pkgJson.peerDependencies || {}),
        ...(pkgJson.optionalDependencies || {}),
      }
      Object.keys(dependencies).forEach((depName) => {
        const depPkg = parseDepToPackage(depName)
        if (!depPkg || resolved.has(depPkg)) return
        const depDir = depPkg === 'style' ? 'style' : `miniprogram.${depPkg}`
        if (!fs.existsSync(path.join(scopeDir, depDir))) return
        resolved.add(depPkg)
        queue.push(depPkg)
      })
    }

    return resolved
  }

  const sourceInjectStart = '/* doraemon-taro-react-plugin:start */'
  const sourceInjectEnd = '/* doraemon-taro-react-plugin:end */'
  const sourceInjectWrapStart = '/* doraemon-taro-react-plugin:wrap-start */'
  const sourceInjectWrapEnd = '/* doraemon-taro-react-plugin:wrap-end */'
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  let appConfigBackup = null

  const findAppConfigSourceFile = () => {
    const candidates = ['app.config.ts', 'app.config.js', 'app.config.tsx', 'app.config.jsx']
    for (const fileName of candidates) {
      const filePath = path.join(sourceRoot, fileName)
      if (fs.existsSync(filePath)) return filePath
    }
    return null
  }

  const buildSourceUsingComponentsBlock = (map) => {
    const entries = Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, componentPath]) => `    '${name}': '${componentPath}',`)
      .join('\n')
    return entries ? `  ${sourceInjectStart}\n${entries}\n  ${sourceInjectEnd}\n` : ''
  }

  const buildSourceUsingComponentsWrapperBlock = (map) => {
    const entriesBlock = buildSourceUsingComponentsBlock(map)
    if (!entriesBlock) return ''
    return `  ${sourceInjectWrapStart}\n  usingComponents: {\n${entriesBlock}  },\n  ${sourceInjectWrapEnd}\n`
  }

  const injectSourceAppConfig = async () => {
    if (appConfigBackup) return
    if (!usingComponentsToInject || Object.keys(usingComponentsToInject).length === 0) return
    const appConfigPath = findAppConfigSourceFile()
    if (!appConfigPath) return

    const source = await fs.readFile(appConfigPath, 'utf8')
    appConfigBackup = { path: appConfigPath, content: source }
    const baseMap = { ...usingComponentsToInject }

    const entryMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectStart)}[\\s\\S]*?${escapeRegExp(sourceInjectEnd)}\\n?`, 'm')
    const wrapperMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectWrapStart)}[\\s\\S]*?${escapeRegExp(sourceInjectWrapEnd)}\\n?`, 'm')
    const cleaned = source
      .replace(wrapperMarkerRE, '')
      .replace(entryMarkerRE, '')

    let next = cleaned
    {
      const scriptKind =
        appConfigPath.endsWith('.tsx') ? ts.ScriptKind.TSX :
          appConfigPath.endsWith('.ts') ? ts.ScriptKind.TS :
            appConfigPath.endsWith('.jsx') ? ts.ScriptKind.JSX :
              ts.ScriptKind.JS
      const sourceFile = ts.createSourceFile(appConfigPath, next, ts.ScriptTarget.Latest, true, scriptKind)
      let configObject = null
      const findConfigObject = (node) => {
        if (
          ts.isCallExpression(node)
          && node.arguments.length > 0
          && ts.isObjectLiteralExpression(node.arguments[0])
        ) {
          const exprText = node.expression.getText(sourceFile)
          if (exprText === 'defineAppConfig' || exprText.endsWith('.defineAppConfig')) {
            configObject = node.arguments[0]
            return
          }
        }
        ts.forEachChild(node, findConfigObject)
      }
      findConfigObject(sourceFile)
      if (!configObject) return

      const usingProperty = configObject.properties.find((prop) =>
        ts.isPropertyAssignment(prop)
        && (
          (ts.isIdentifier(prop.name) && prop.name.text === 'usingComponents')
          || (ts.isStringLiteral(prop.name) && prop.name.text === 'usingComponents')
        )
        && ts.isObjectLiteralExpression(prop.initializer)
      )

      if (usingProperty && ts.isObjectLiteralExpression(usingProperty.initializer)) {
        const existingKeys = new Set()
        usingProperty.initializer.properties.forEach((prop) => {
          if (!ts.isPropertyAssignment(prop)) return
          if (ts.isIdentifier(prop.name)) existingKeys.add(prop.name.text)
          if (ts.isStringLiteral(prop.name)) existingKeys.add(prop.name.text)
        })
        existingKeys.forEach((key) => {
          delete baseMap[key]
        })
        const block = buildSourceUsingComponentsBlock(baseMap)
        if (!block) return
        const closeBraceIndex = usingProperty.initializer.end - 1
        const beforeClose = next.slice(0, closeBraceIndex)
        const prefix = /\n[ \t]*$/.test(beforeClose) ? '' : '\n'
        next = `${beforeClose}${prefix}${block}${next.slice(closeBraceIndex)}`
      } else {
        const block = buildSourceUsingComponentsWrapperBlock(baseMap)
        if (!block) return
        const closeBraceIndex = configObject.end - 1
        const beforeClose = next.slice(0, closeBraceIndex)
        const prefix = /\n[ \t]*$/.test(beforeClose) ? '' : '\n'
        next = `${beforeClose}${prefix}${block}${next.slice(closeBraceIndex)}`
      }
    }

    if (next !== source) {
      await fs.writeFile(appConfigPath, next, 'utf8')
      if (debug) console.log('[doraemon-taro-react-plugin] source app.config injected')
    }
  }

  const restoreSourceAppConfig = async () => {
    if (appConfigBackup) {
      const { path: filePath, content } = appConfigBackup
      appConfigBackup = null
      if (!(await fs.pathExists(filePath))) return
      await fs.writeFile(filePath, content, 'utf8')
      if (debug) console.log('[doraemon-taro-react-plugin] source app.config restored')
      return
    }
    const filePath = findAppConfigSourceFile()
    if (!filePath) return
    if (!(await fs.pathExists(filePath))) return
    const source = await fs.readFile(filePath, 'utf8')
    const entryMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectStart)}[\\s\\S]*?${escapeRegExp(sourceInjectEnd)}\\n?`, 'm')
    const wrapperMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectWrapStart)}[\\s\\S]*?${escapeRegExp(sourceInjectWrapEnd)}\\n?`, 'm')
    const restored = source
      .replace(wrapperMarkerRE, '')
      .replace(entryMarkerRE, '')
    if (restored !== source) {
      await fs.writeFile(filePath, restored, 'utf8')
      if (debug) console.log('[doraemon-taro-react-plugin] source app.config restored')
    }
  }

  let usingComponentsToInject = {}
  let packagesToCopy = new Set()
  let prepared = false
  let copiedBeforeBuild = false

  const prepare = () => {
    if (prepared) return
    prepared = true

    const pkgDeps = getPkgDepsSync()
    const hasPkgDeps = Object.keys(pkgDeps).length > 0

    if (hasPkgDeps) {
      const { dirToRef, nameToDir, packageToComponents } = buildRefs(pkgDeps)
      const usedDirs = collectUsedComponentDirsSync(nameToDir)
      const resolvedDirs = resolveDependencies(usedDirs, dirToRef, packageToComponents)

      const map = {}
      const packageSet = new Set()
      resolvedDirs.forEach((dir) => {
        const ref = dirToRef.get(dir)
        if (!ref) return
        packageSet.add(ref.packageName)
        map[`dora-${dir}`] = `/miniprogram_npm/@doraemon-ui/miniprogram.${ref.packageName}/${ref.meta.src}`
      })

      if (Object.keys(map).length > 0) {
        usingComponentsToInject = map
        packagesToCopy = resolvePackageLevelDeps(packageSet)
        if (debug) {
          console.log('[doraemon-taro-react-plugin] mode=deps', `inject=${Object.keys(map).length}`, `packages=${packagesToCopy.size}`)
        }
        return
      }
    }

    usingComponentsToInject = collectFallbackUsingComponentsSync()
    packagesToCopy = new Set()
    if (debug) {
      console.log('[doraemon-taro-react-plugin] mode=fallback', `inject=${Object.keys(usingComponentsToInject).length}`)
    }
  }

  ctx.onBuildStart(async () => {
    if (copiedBeforeBuild) return
    copiedBeforeBuild = true
    prepare()
    await injectSourceAppConfig()
    if (debug) {
      console.log('[doraemon-taro-react-plugin] onBuildStart', `packagesToCopy=${packagesToCopy.size}`)
    }
    if (packagesToCopy.size > 0) {
      for (const packageName of packagesToCopy) {
        await copyPackageDist(packageName)
      }
      return
    }
    if (!(await fs.pathExists(scopeDir))) return
    const packages = await fs.readdir(scopeDir)
    for (const pkg of packages) {
      if (excludePackages.has(pkg)) continue
      if (!pkg.startsWith('miniprogram.') && pkg !== 'style') continue
      const pkgDir = path.join(scopeDir, pkg)
      const stat = await fs.stat(pkgDir)
      if (!stat.isDirectory()) continue
      const miniprogramDistDir = path.join(pkgDir, 'miniprogram_dist')
      if (!(await fs.pathExists(miniprogramDistDir))) continue
      await fs.copy(miniprogramDistDir, path.join(targetScopeDir, pkg))
    }
  })

  ctx.onBuildComplete(async () => {
    try {
      prepare()
      if (debug) {
        console.log('[doraemon-taro-react-plugin] onBuildComplete', `packagesToCopy=${packagesToCopy.size}`)
      }
      if (packagesToCopy.size > 0) {
        for (const packageName of packagesToCopy) {
          await copyPackageDist(packageName)
        }
        return
      }

      if (!(await fs.pathExists(scopeDir))) return
      const packages = await fs.readdir(scopeDir)
      for (const pkg of packages) {
        if (excludePackages.has(pkg)) continue
        if (!pkg.startsWith('miniprogram.') && pkg !== 'style') continue
        const pkgDir = path.join(scopeDir, pkg)
        const stat = await fs.stat(pkgDir)
        if (!stat.isDirectory()) continue
        const miniprogramDistDir = path.join(pkgDir, 'miniprogram_dist')
        if (!(await fs.pathExists(miniprogramDistDir))) continue
        await fs.copy(miniprogramDistDir, path.join(targetScopeDir, pkg))
      }
    } finally {
      await restoreSourceAppConfig()
    }
  })
}
