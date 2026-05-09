const fs = require('fs')
const path = require('path')

// 根目录
const ROOT = path.resolve(__dirname, '..')

// @doraemon-ui 源目录
const SRC_ROOT = path.join(ROOT, 'node_modules', '@doraemon-ui')

// 默认组件目录
const DEFAULT_TARGET_DIR = path.join(ROOT, 'playground', 'miniprogram', 'pages')

// 第一个非 flag 参数作为目标目录
const targetArg = process.argv.find((arg) => !arg.startsWith('--') && arg !== process.argv[0] && arg !== process.argv[1])

const TARGET_DIR = targetArg ? path.resolve(ROOT, targetArg) : DEFAULT_TARGET_DIR

// 输出目录
const DEST_ROOT = path.join(TARGET_DIR, 'miniprogram_npm')

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

function copyDir(src, dest) {
  if (!exists(src)) return

  ensureDir(dest)

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
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

function parseScope(fullName) {
  const parts = fullName.split('/')

  return {
    scope: parts[0],
    name: parts[1],
  }
}

function getPackageJson(pkgName) {
  const shortName = pkgName.split('/')[1]

  const pkgJsonPath = path.join(SRC_ROOT, shortName, 'package.json')

  if (!exists(pkgJsonPath)) {
    return null
  }

  try {
    return require(pkgJsonPath)
  } catch {
    return null
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
  const targetPkgPath = path.join(TARGET_DIR, 'package.json')

  if (!exists(targetPkgPath)) {
    console.error('[build-playground-miniprogram_npm] package.json not found:')

    console.error(targetPkgPath)

    process.exit(1)
  }

  const targetPkg = require(targetPkgPath)

  const deps = Object.keys(targetPkg.dependencies || {})

  const packages = [...collectPackages(deps)]

  let copied = 0
  let skipped = 0

  ensureDir(DEST_ROOT)

  for (const fullName of packages) {
    const { scope, name } = parseScope(fullName)

    const srcDist = path.join(SRC_ROOT, name, 'miniprogram_dist')

    const destDist = path.join(DEST_ROOT, scope, name)

    if (!exists(srcDist)) {
      skipped++
      continue
    }

    copyDir(srcDist, destDist)

    copied++
  }

  console.log('[build-playground-miniprogram_npm] done')
  console.log('- TARGET_DIR:', TARGET_DIR)
  console.log('- SRC_ROOT:', SRC_ROOT)
  console.log('- DEST_ROOT:', DEST_ROOT)
  console.log('- packages:', packages.length)
  console.log('- copied:', copied)
  console.log('- skipped:', skipped)

  if (DRY_RUN) {
    console.log('[dry-run] no files written')
  }
}

main()
