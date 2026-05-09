const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PACKAGES_DIR = path.join(ROOT, 'packages')
const PLAYGROUND_DIR = path.join(ROOT, 'playground', 'miniprogram', 'pages')
const COMPONENTS_PATH = path.join(PLAYGROUND_DIR, 'index', 'components.js')
const APP_JSON_PATH = path.join(PLAYGROUND_DIR, 'app.json')
const PACKAGE_JSON_PATH = path.join(PLAYGROUND_DIR, 'package.json')
const DRY_RUN = process.argv.includes('--dry-run')
const USE_WORKSPACE_VERSION = false

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

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath))
  } catch {
    return null
  }
}

function writeIfChanged(destPath, content) {
  if (exists(destPath)) {
    const oldContent = readText(destPath)
    if (oldContent === content) {
      return false
    }
  }

  ensureDir(path.dirname(destPath))

  if (!DRY_RUN) {
    fs.writeFileSync(destPath, content, 'utf8')
  }

  return true
}

function copyDir(srcDir, destDir) {
  if (!exists(srcDir)) return 0

  ensureDir(destDir)

  let changedCount = 0

  const entries = fs.readdirSync(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue

    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      changedCount += copyDir(srcPath, destPath)
      continue
    }

    const content = fs.readFileSync(srcPath)

    let changed = true

    if (exists(destPath)) {
      const oldContent = fs.readFileSync(destPath)
      changed = !oldContent.equals(content)
    }

    if (changed && !DRY_RUN) {
      fs.writeFileSync(destPath, content)
    }

    if (changed) {
      changedCount += 1
    }
  }

  return changedCount
}

function parseComponentsConfig() {
  if (!exists(COMPONENTS_PATH)) {
    throw new Error(`components.js not found: ${COMPONENTS_PATH}`)
  }

  const content = readText(COMPONENTS_PATH)

  const urlMatches = [...content.matchAll(/url\s*:\s*['"]([^'"]+)['"]/g)]

  const components = []
  const seen = new Set()

  for (const match of urlMatches) {
    const rawUrl = match[1]

    // /accordion/index -> accordion
    const component = rawUrl
      .replace(/^\//, '')
      .replace(/\/index$/, '')
      .trim()

    if (!component || component === 'index') continue

    if (seen.has(component)) continue

    seen.add(component)

    components.push(component)
  }

  return components
}

function resolvePackageName(component) {
  return `miniprogram.${component}`
}

function resolvePackagePath(component) {
  return path.join(PACKAGES_DIR, resolvePackageName(component))
}

function hasPlayground(component) {
  const playgroundPath = path.join(resolvePackagePath(component), 'playground', 'pages', 'index')

  return exists(playgroundPath)
}

function getPlaygroundSource(component) {
  return path.join(resolvePackagePath(component), 'playground', 'pages', 'index')
}

function getPlaygroundTarget(component) {
  return path.join(PLAYGROUND_DIR, component)
}

function updateAppJson(components) {
  const appJson = readJson(APP_JSON_PATH) || {}

  const oldPages = Array.isArray(appJson.pages) ? appJson.pages : []

  const pageSet = new Set(oldPages)

  for (const component of components) {
    pageSet.add(`${component}/index`)
  }

  appJson.pages = Array.from(pageSet)

  return writeIfChanged(APP_JSON_PATH, `${JSON.stringify(appJson, null, 2)}\n`)
}

function getPackageVersion(component) {
  const packageJsonPath = path.join(resolvePackagePath(component), 'package.json')

  const packageJson = readJson(packageJsonPath)

  if (!packageJson || !packageJson.version) {
    return 'latest'
  }

  return packageJson.version
}

function updatePackageJson(components) {
  const pkgJson = readJson(PACKAGE_JSON_PATH) || {}

  pkgJson.dependencies = pkgJson.dependencies || {}

  for (const component of components) {
    const packageName = `@doraemon-ui/miniprogram.${component}`

    const version = USE_WORKSPACE_VERSION ? 'workspace:*' : getPackageVersion(component)

    pkgJson.dependencies[packageName] = version
  }

  return writeIfChanged(
    PACKAGE_JSON_PATH,
    `${JSON.stringify(pkgJson, null, 2)}
`,
  )
}

function main() {
  const components = parseComponentsConfig()

  const validComponents = []
  const skippedComponents = []
  const copiedComponents = []

  for (const component of components) {
    const packagePath = resolvePackagePath(component)

    if (!exists(packagePath)) {
      skippedComponents.push({
        component,
        reason: 'package not found',
      })
      continue
    }

    if (!hasPlayground(component)) {
      skippedComponents.push({
        component,
        reason: 'playground not found',
      })
      continue
    }

    const srcDir = getPlaygroundSource(component)
    const destDir = getPlaygroundTarget(component)

    const changedCount = copyDir(srcDir, destDir)

    copiedComponents.push({
      component,
      changedCount,
    })

    validComponents.push(component)
  }

  const appJsonChanged = updateAppJson(validComponents)
  const packageJsonChanged = updatePackageJson(validComponents)

  const logs = []

  logs.push('[build-playground-miniprogram] done')
  logs.push(`- components scanned: ${components.length}`)
  logs.push(`- valid components: ${validComponents.length}`)
  logs.push(`- skipped components: ${skippedComponents.length}`)

  logs.push('')
  logs.push('[copied components]')

  for (const item of copiedComponents) {
    logs.push(`- ${item.component} (${item.changedCount} files updated)`)
  }

  if (skippedComponents.length > 0) {
    logs.push('')
    logs.push('[skipped components]')

    for (const item of skippedComponents) {
      logs.push(`- ${item.component}: ${item.reason}`)
    }
  }

  logs.push('')
  logs.push(`[app.json updated] ${appJsonChanged}`)
  logs.push(`[package.json updated] ${packageJsonChanged}`)

  if (DRY_RUN) {
    logs.push('')
    logs.push('[dry-run] no files written')
  }

  // eslint-disable-next-line no-console
  console.log(logs.join('\n'))
}

main()
