import fs from 'node:fs/promises'
import path from 'node:path'

import { toutiaoPlatform } from './tt'

const ROOT = process.cwd()
const SOURCE_ROOT = path.join(ROOT, 'packages')
const TARGET_ROOT = path.join(ROOT, 'packages-tt')
const DRY_RUN = process.argv.includes('--dry-run')

interface JsonRecord {
  [key: string]: any
}

interface BuildStats {
  packages: number
  filesCopied: number
  packagesBuilt: number
}

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function ensureDir(targetPath: string) {
  if (DRY_RUN) {
    return
  }

  await fs.mkdir(targetPath, { recursive: true })
}

async function resetDir(targetPath: string) {
  if (DRY_RUN) {
    return
  }

  await fs.rm(targetPath, { recursive: true, force: true })
  await fs.mkdir(targetPath, { recursive: true })
}

async function readJson(filePath: string) {
  return JSON.parse(await fs.readFile(filePath, 'utf8')) as JsonRecord
}

async function writeFile(filePath: string, content: string) {
  await ensureDir(path.dirname(filePath))

  if (DRY_RUN) {
    return
  }

  await fs.writeFile(filePath, content)
}

async function removeFile(filePath: string) {
  if (DRY_RUN) {
    return
  }

  await fs.rm(filePath, { force: true })
}

async function collectPackageDirs() {
  const entries = await fs.readdir(SOURCE_ROOT, { withFileTypes: true })
  const packageDirs: string[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const pkgDir = path.join(SOURCE_ROOT, entry.name)
    const pkgJsonPath = path.join(pkgDir, 'package.json')

    if (!(await pathExists(pkgJsonPath))) {
      continue
    }

    const pkg = await readJson(pkgJsonPath)

    if (typeof pkg.name !== 'string' || !pkg.name.startsWith('@doraemon-ui/miniprogram.')) {
      continue
    }

    packageDirs.push(pkgDir)
  }

  return packageDirs.sort((a, b) => a.localeCompare(b))
}

async function copyDir(srcDir: string, destDir: string, stats: BuildStats) {
  await ensureDir(destDir)

  const entries = await fs.readdir(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === 'node_modules') {
      continue
    }

    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, stats)
      continue
    }

    await ensureDir(path.dirname(destPath))

    if (!DRY_RUN) {
      await fs.copyFile(srcPath, destPath)
    }

    stats.filesCopied += 1
  }
}

function normalizeStyleContent(content: string) {
  return toutiaoPlatform.transformStyle(content).replace(/\.wxss(?=['")\s;]|$)/g, '.ttss')
}

async function transformDistFiles(sourceDistDir: string, targetDistDir: string) {
  const componentExports: Record<string, string> = {}

  async function visit(currentSourceDir: string, currentTargetDir: string) {
    const entries = await fs.readdir(currentSourceDir, { withFileTypes: true })

    for (const entry of entries) {
      const sourcePath = path.join(currentSourceDir, entry.name)
      const targetPath = path.join(currentTargetDir, entry.name)

      if (entry.isDirectory()) {
        await visit(sourcePath, targetPath)
        continue
      }

      if (entry.name.endsWith('.wxml')) {
        const content = await fs.readFile(sourcePath, 'utf8')
        const nextPath = targetPath.replace(/\.wxml$/, toutiaoPlatform.markupExt)

        await writeFile(nextPath, toutiaoPlatform.transformTemplate(content))
        await removeFile(targetPath)
        continue
      }

      if (entry.name.endsWith('.wxss')) {
        const content = await fs.readFile(sourcePath, 'utf8')
        const nextPath = targetPath.replace(/\.wxss$/, toutiaoPlatform.styleExt)

        await writeFile(nextPath, normalizeStyleContent(content))
        await removeFile(targetPath)
        continue
      }

      if (!entry.name.endsWith('.json')) {
        continue
      }

      const json = await readJson(sourcePath)
      const transformed = toutiaoPlatform.transformJson(json)

      if (transformed.component === true) {
        const stem = path.basename(entry.name, '.json')
        componentExports[stem] = `./miniprogram_dist/${stem}`
      }

      await writeFile(targetPath, `${JSON.stringify(transformed, null, 2)}\n`)
    }
  }

  await visit(sourceDistDir, targetDistDir)

  return componentExports
}

async function transformPackage(sourceDir: string, targetDir: string) {
  const sourcePkgJsonPath = path.join(sourceDir, 'package.json')
  const targetPkgJsonPath = path.join(targetDir, 'package.json')
  const sourceDistDir = path.join(sourceDir, 'miniprogram_dist')
  const targetDistDir = path.join(targetDir, 'miniprogram_dist')
  const pkg = await readJson(sourcePkgJsonPath)
  const componentName = String(pkg.name).replace('@doraemon-ui/miniprogram.', '')

  const componentExports = (await pathExists(sourceDistDir))
    ? await transformDistFiles(sourceDistDir, targetDistDir)
    : {}

  const transformedPkg = toutiaoPlatform.transformPackageJson(pkg, {
    componentName,
    exports: componentExports,
  })

  await writeFile(targetPkgJsonPath, `${JSON.stringify(transformedPkg, null, 2)}\n`)
}

async function main() {
  const stats: BuildStats = {
    packages: 0,
    filesCopied: 0,
    packagesBuilt: 0,
  }

  const packageDirs = await collectPackageDirs()

  stats.packages = packageDirs.length

  await resetDir(TARGET_ROOT)

  for (const pkgDir of packageDirs) {
    const targetDir = path.join(TARGET_ROOT, path.basename(pkgDir))

    await copyDir(pkgDir, targetDir, stats)
    await transformPackage(pkgDir, targetDir)
    stats.packagesBuilt += 1
  }

  console.log('[build-tt] done')
  console.log('- SOURCE_ROOT:', SOURCE_ROOT)
  console.log('- TARGET_ROOT:', TARGET_ROOT)
  console.log('- packages:', stats.packages)
  console.log('- built:', stats.packagesBuilt)
  console.log('- filesCopied:', stats.filesCopied)

  if (DRY_RUN) {
    console.log('[dry-run] no files written')
  }
}

main().catch((error) => {
  console.error('[build-tt] failed')
  console.error(error)
  process.exit(1)
})
