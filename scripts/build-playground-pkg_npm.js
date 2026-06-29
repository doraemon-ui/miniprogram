const fs = require('fs')
const path = require('path')

// 根目录
const ROOT = path.resolve(__dirname, '..')

// @doraemon-ui 源目录
const SRC_ROOT = path.join(ROOT, 'node_modules', '@doraemon-ui')

// dry-run
const DRY_RUN = process.argv.includes('--dry-run')

// 排除包
const EXCLUDE_PACKAGES = ['taro-react']

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function ensureDir(dir) {
  if (!DRY_RUN) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    return null
  }
}

function normalizeComponentName(input) {
  if (!input) {
    return ''
  }

  if (input.startsWith('@doraemon-ui/')) {
    return input.split('/')[1]
  }

  if (input.startsWith('miniprogram.')) {
    return input
  }

  return `miniprogram.${input}`
}

function resolveComponentArg() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))

  return args[0] || ''
}

function resolveTargetDir() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))
  const targetArg = args[1]

  return targetArg ? path.resolve(ROOT, targetArg) : ''
}

function parseScope(fullName) {
  const parts = fullName.split('/')

  return {
    scope: parts[0],
    name: parts[1],
  }
}

function getLocalPackageDir(pkgName) {
  const shortName = pkgName.split('/')[1]
  return path.join(SRC_ROOT, shortName)
}

function getComponentPackageDir(componentName) {
  return path.join(ROOT, 'packages', componentName)
}

function getPackageJson(pkgName) {
  const pkgDir = getLocalPackageDir(pkgName)
  const pkgJsonPath = path.join(pkgDir, 'package.json')

  if (!exists(pkgJsonPath)) {
    return null
  }

  return readJson(pkgJsonPath)
}

function copyDir(src, dest) {
  if (!exists(src)) return

  ensureDir(dest)

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === 'node_modules') {
      continue
    }

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      ensureDir(path.dirname(destPath))

      if (!DRY_RUN) {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}

/**
 * 递归收集 @doraemon-ui/* 依赖
 */
function collectPackages(deps, collected = new Set()) {
  for (const dep of deps) {
    if (!dep.startsWith('@doraemon-ui/')) {
      continue
    }

    const shortName = dep.split('/')[1]

    if (EXCLUDE_PACKAGES.includes(shortName)) {
      continue
    }

    if (collected.has(dep)) {
      continue
    }

    collected.add(dep)

    const pkgJson = getPackageJson(dep)

    if (!pkgJson) {
      continue
    }

    const subDeps = Object.keys(pkgJson.dependencies || {})

    collectPackages(subDeps, collected)
  }

  return collected
}

function main() {
  const componentName = normalizeComponentName(resolveComponentArg())

  if (!componentName) {
    console.error('[build-playground-pkg_npm] component name is required')
    console.error('Usage: node scripts/build-playground-pkg_npm.js <component> [targetDir] [--dry-run]')
    console.error('Example: node scripts/build-playground-pkg_npm.js tag')
    process.exit(1)
  }

  const componentDir = getComponentPackageDir(componentName)
  const pagesPkgPath = path.join(componentDir, 'playground', 'pages', 'package.json')
  const defaultTargetDir = path.join(componentDir, 'playground', 'pages')
  const targetDir = resolveTargetDir() || defaultTargetDir
  const destRoot = path.join(targetDir, 'node_modules')

  if (!exists(pagesPkgPath)) {
    console.error('[build-playground-pkg_npm] playground package.json not found:')
    console.error(pagesPkgPath)
    process.exit(1)
  }

  const pagesPkg = readJson(pagesPkgPath)

  if (!pagesPkg) {
    console.error('[build-playground-pkg_npm] failed to parse package.json:')
    console.error(pagesPkgPath)
    process.exit(1)
  }

  const deps = Object.keys(pagesPkg.dependencies || {})
  const packages = [...collectPackages(deps)]

  let copied = 0
  let skipped = 0

  ensureDir(destRoot)

  for (const fullName of packages) {
    const { scope, name } = parseScope(fullName)
    const srcDir = getLocalPackageDir(fullName)
    const destDir = path.join(destRoot, scope, name)

    if (!exists(srcDir)) {
      skipped++
      continue
    }

    copyDir(srcDir, destDir)
    copied++
  }

  console.log('[build-playground-pkg_npm] done')
  console.log('- component:', componentName)
  console.log('- TARGET_DIR:', targetDir)
  console.log('- SRC_ROOT:', SRC_ROOT)
  console.log('- DEST_ROOT:', destRoot)
  console.log('- package.json:', pagesPkgPath)
  console.log('- packages:', packages.length)
  console.log('- copied:', copied)
  console.log('- skipped:', skipped)

  if (DRY_RUN) {
    console.log('[dry-run] no files written')
  }
}

main()
