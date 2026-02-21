import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'

interface TaroPluginContext {
  paths: { outputPath: string }
  onBuildFinish: (fn: () => Promise<void>) => void
}

export default (ctx: TaroPluginContext) => {
  ctx.onBuildFinish(async () => {
    const dist = path.join(ctx.paths.outputPath)
    const scopeDir = path.resolve(process.cwd(), 'node_modules/@doraemon-ui')
    const targetScopeDir = path.join(dist, 'miniprogram_npm/@doraemon-ui')
    const excludePackages = new Set(['cli', 'tools', 'taro-react'])
    const scannedUsingComponents: Record<string, string> = {}

    const toComponentTagBase = (pkg: string) => {
      if (!pkg.startsWith('miniprogram.')) return ''
      const shortName = pkg.slice('miniprogram.'.length)
      // demo 系列沿用原标签名（如 demo-page / demo-block）
      if (shortName.startsWith('demo-')) {
        return shortName
      }
      return `dora-${shortName}`
    }

    const toKebab = (name: string) =>
      name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()

    if (await fs.pathExists(scopeDir)) {
      const packages = await fs.readdir(scopeDir)
      for (const pkg of packages) {
        if (excludePackages.has(pkg)) continue

        const pkgDir = path.join(scopeDir, pkg)
        const stat = await fs.stat(pkgDir)
        if (!stat.isDirectory()) continue

        const miniprogramDistDir = path.join(pkgDir, 'miniprogram_dist')
        if (!(await fs.pathExists(miniprogramDistDir))) continue

        await fs.copy(miniprogramDistDir, path.join(targetScopeDir, pkg))

        const componentTagBase = toComponentTagBase(pkg)
        if (!componentTagBase) continue

        // 仅收集 component: true 的 json 作为 usingComponents 入口
        const componentJsonFiles = await glob(`${miniprogramDistDir}/*.json`)
        for (const componentJsonPath of componentJsonFiles) {
          const componentJson = await fs.readJSON(componentJsonPath)
          if (!componentJson?.component) continue

          const fileName = path.basename(componentJsonPath, '.json')
          const suffix = fileName === 'index' ? '' : `-${toKebab(fileName)}`
          const componentTag = `${componentTagBase}${suffix}`

          scannedUsingComponents[componentTag] = `miniprogram_npm/@doraemon-ui/${pkg}/${fileName}`
        }
      }
    }

    // const appJsonPath = path.join(dist, 'app.json')
    // if (await fs.pathExists(appJsonPath)) {
    //   const appJson = await fs.readJSON(appJsonPath)
    //   appJson.usingComponents = {
    //     ...scannedUsingComponents,
    //     ...appJson.usingComponents,
    //   }
    //   await fs.writeJSON(appJsonPath, appJson)
    // }
  })
}
