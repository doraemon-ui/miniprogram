/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PACKAGES_ROOT = path.join(ROOT, 'packages')
const OUTPUT_PATH = path.join(ROOT, 'miniprogram.pkg-deps.json')
const DRY_RUN = process.argv.includes('--dry-run')

function readFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf8')
}

function readJsonIfExists(filePath) {
  const content = readFileIfExists(filePath)
  if (!content) return null
  try {
    return JSON.parse(content)
  } catch {
    return null
  }
}

function sortBy(a, b) {
  return a.localeCompare(b)
}

function toPascalCase(input) {
  return input
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function toKebabCase(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function findClassName(sourceCode) {
  if (!sourceCode) return null
  const matched = sourceCode.match(/class\s+(\w+)\s+extends/)
  return matched ? matched[1] : null
}

function getMiniprogramPackages() {
  return fs
    .readdirSync(PACKAGES_ROOT)
    .filter((dir) => dir.startsWith('miniprogram.') && dir !== 'miniprogram.core-js')
    .sort(sortBy)
}

function getComponentJsonStems(srcDir) {
  if (!fs.existsSync(srcDir)) return []
  return fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''))
    .filter((stem) => stem !== 'types')
    .filter((stem) => {
      const json = readJsonIfExists(path.join(srcDir, `${stem}.json`))
      return Boolean(json && json.component === true)
    })
    .sort((a, b) => {
      if (a === 'index' && b !== 'index') return -1
      if (a !== 'index' && b === 'index') return 1
      return a.localeCompare(b)
    })
}

function parseDepNameFromTag(tag) {
  return String(tag || '').replace(/^dora-/, '')
}

function parseDepSource(currentPackageShortName, modulePath) {
  if (modulePath.startsWith('./') || modulePath.startsWith('../')) {
    if (!modulePath.startsWith('../../miniprogram.')) return 'self'
  }
  const matched = modulePath.match(/miniprogram\.([a-z0-9-]+)\/src\//)
  if (!matched) return 'packages'
  const targetPackage = matched[1]
  return targetPackage === currentPackageShortName ? 'self' : 'packages'
}

function parseDeps(currentPackageShortName, componentJson) {
  const usingComponents = componentJson && typeof componentJson.usingComponents === 'object' ? componentJson.usingComponents : null
  if (!usingComponents || Object.keys(usingComponents).length === 0) return null

  const deps = Object.entries(usingComponents)
    .map(([tag, modulePath]) => {
      if (typeof modulePath !== 'string') return null
      const name = parseDepNameFromTag(tag)
      if (!name) return null
      return {
        name,
        source: parseDepSource(currentPackageShortName, modulePath),
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))

  return deps.length > 0 ? deps : null
}

function buildComponentRecord(packageShortName, srcStem, className, parentClassName, componentJson) {
  const key = srcStem === 'index' ? packageShortName : srcStem
  const dir = toKebabCase(className || toPascalCase(srcStem === 'index' ? packageShortName : srcStem))

  let slot = null
  if (srcStem !== 'index') {
    const fallbackSlot = toPascalCase(srcStem)
    if (parentClassName && className && className.startsWith(parentClassName)) {
      const derived = className.slice(parentClassName.length)
      slot = derived || fallbackSlot
    } else {
      slot = fallbackSlot
    }
  }

  return {
    key,
    value: {
      src: srcStem,
      dir,
      name: className || toPascalCase(srcStem === 'index' ? packageShortName : srcStem),
      slot,
      deps: parseDeps(packageShortName, componentJson),
    },
  }
}

function buildPkgDeps() {
  const result = {}
  const packageDirs = getMiniprogramPackages()

  for (const packageDirName of packageDirs) {
    const packageShortName = packageDirName.replace(/^miniprogram\./, '')
    const srcDir = path.join(PACKAGES_ROOT, packageDirName, 'src')
    const stems = getComponentJsonStems(srcDir)
    if (stems.length === 0) continue

    const parentTsPath = path.join(srcDir, 'index.ts')
    const parentClassName = findClassName(readFileIfExists(parentTsPath))
    const components = {}

    for (const stem of stems) {
      const tsPath = path.join(srcDir, `${stem}.ts`)
      const jsonPath = path.join(srcDir, `${stem}.json`)
      const className = findClassName(readFileIfExists(tsPath))
      const componentJson = readJsonIfExists(jsonPath) || {}
      const record = buildComponentRecord(packageShortName, stem, className, parentClassName, componentJson)
      components[record.key] = record.value
    }

    result[packageShortName] = { components }
  }

  return result
}

function main() {
  const data = buildPkgDeps()
  const content = `${JSON.stringify(data, null, 2)}\n`
  if (!DRY_RUN) {
    fs.writeFileSync(OUTPUT_PATH, content)
    console.log(`generated: ${path.relative(ROOT, OUTPUT_PATH)}`)
    return
  }

  console.log(`[dry-run] target: ${path.relative(ROOT, OUTPUT_PATH)}`)
  console.log(`[dry-run] packages: ${Object.keys(data).length}`)
  console.log(`[dry-run] bytes: ${Buffer.byteLength(content, 'utf8')}`)
}

main()
