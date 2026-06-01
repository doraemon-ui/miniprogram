const fs = require('fs')
const path = require('path')
const glob = require('glob')

// ============================================================
// 手动修改这里的版本号
// ============================================================
const CLI_VERSION = '0.0.2-alpha.57'
const TOOLS_VERSION = '0.0.2-alpha.34'

const PACKAGES = {
  '@doraemon-ui/miniprogram.cli': CLI_VERSION,
  '@doraemon-ui/miniprogram.tools': TOOLS_VERSION,
}

const packagesDir = path.resolve(__dirname, '../packages')

const files = glob.sync(`${packagesDir}/**/package.json`, {
  ignore: '**/node_modules/**',
})

let updated = 0

files.forEach((file) => {
  const pkg = JSON.parse(fs.readFileSync(file, 'utf-8'))
  let changed = false

  Object.entries(PACKAGES).forEach(([name, version]) => {
    if (pkg.devDependencies && pkg.devDependencies[name] !== undefined) {
      pkg.devDependencies[name] = version
      changed = true
    }
    if (pkg.dependencies && pkg.dependencies[name] !== undefined) {
      pkg.dependencies[name] = version
      changed = true
    }
  })

  if (changed) {
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n')
    console.log(`✓ ${path.relative(packagesDir, file)}`)
    updated++
  }
})

console.log(`\nDone. Updated ${updated} package(s).`)
