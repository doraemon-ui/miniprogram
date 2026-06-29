const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PLAYGROUND_DIR = path.join(ROOT, 'playground', 'miniprogram', 'pages')
const TARGET_ROOT = path.join(PLAYGROUND_DIR, 'miniprogram_npm')
const PACKAGE_ROOTS = [path.join(ROOT, 'packages'), path.join(ROOT, 'packages-core'), path.join(ROOT, 'demos')]
const DRY_RUN = process.argv.includes('--dry-run')

function exists(targetPath) {
  try {
    fs.accessSync(targetPath)
    return true
  } catch {
    return false
  }
}

function ensureDir(dirPath) {
  if (!DRY_RUN) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function copyFile(srcPath, destPath) {
  ensureDir(path.dirname(destPath))

  if (DRY_RUN) {
    return
  }

  fs.copyFileSync(srcPath, destPath)
}

function copyDir(srcDir, destDir) {
  if (!exists(srcDir)) {
    return
  }
  ensureDir(destDir)

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue

    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFile(srcPath, destPath)
    }
  }
}

function emptyDir(dirPath) {
  if (!exists(dirPath) || DRY_RUN) {
    return
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true })
    } else {
      fs.unlinkSync(fullPath)
    }
  }
}

function collectWorkspacePackages() {
  const packageMap = new Map()

  for (const rootDir of PACKAGE_ROOTS) {
    if (!exists(rootDir)) continue

    for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue

      const pkgDir = path.join(rootDir, entry.name)
      const pkgJsonPath = path.join(pkgDir, 'package.json')

      if (!exists(pkgJsonPath)) continue

      const pkg = readJson(pkgJsonPath)

      if (pkg?.name) {
        packageMap.set(pkg.name, {
          dir: pkgDir,
          pkg,
        })
      }
    }
  }

  return packageMap
}
function collectScopedDeps(packageNames, packageMap, collected = new Set()) {
  for (const packageName of packageNames) {
    if (!packageName.startsWith('@doraemon-ui/')) continue
    if (collected.has(packageName)) continue
    if (!packageMap.has(packageName)) continue

    collected.add(packageName)

    const { pkg } = packageMap.get(packageName)
    const nextDeps = Object.keys(pkg.dependencies || {})

    collectScopedDeps(nextDeps, packageMap, collected)
  }

  return collected
}

function syncPackage(packageName, packageMap) {
  const { dir, pkg } = packageMap.get(packageName)
  const distDir = path.join(dir, pkg.miniprogram || 'miniprogram_dist')

  if (!exists(distDir)) {
    return false
  }

  const [, shortName] = packageName.split('/')
  const destDir = path.join(TARGET_ROOT, '@doraemon-ui', shortName)

  ensureDir(destDir)
  copyDir(distDir, destDir)

  return true
}

function main() {
  const packageMap = collectWorkspacePackages()
  const targetPkg = readJson(path.join(PLAYGROUND_DIR, 'package.json'))
  const deps = Object.keys(targetPkg.dependencies || {})
  const packages = [...collectScopedDeps(deps, packageMap)].sort()

  let copied = 0
  let skipped = 0

  ensureDir(TARGET_ROOT)
  emptyDir(TARGET_ROOT)

  for (const packageName of packages) {
    if (syncPackage(packageName, packageMap)) {
      copied += 1
    } else {
      skipped += 1
    }
  }

  console.log('[build-playground-miniprogram-tt] done')
  console.log('- TARGET_ROOT:', TARGET_ROOT)
  console.log('- packages:', packages.length)
  console.log('- copied:', copied)
  console.log('- skipped:', skipped)

  if (DRY_RUN) {
    console.log('[dry-run] no files written')
  }
}

main()
