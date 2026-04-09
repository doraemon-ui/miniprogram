/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const DRY_RUN = process.argv.includes('--dry-run')

const TARO_ROOT = __dirname
const REPO_ROOT = path.resolve(TARO_ROOT, '../..')
const PACKAGES_ROOT = path.join(REPO_ROOT, 'packages')
const PKG_DEPS_PATH = path.join(REPO_ROOT, 'miniprogram.pkg-deps.json')
const TARO_SRC_ROOT = path.join(TARO_ROOT, 'src')
const TARO_COMPONENTS_ROOT = path.join(TARO_SRC_ROOT, 'components')
const JSX_DTS_PATH = path.join(TARO_SRC_ROOT, 'jsx.d.ts')
const ENTRY_INDEX_PATH = path.join(TARO_SRC_ROOT, 'index.ts')
const PACKAGE_JSON_PATH = path.join(TARO_ROOT, 'package.json')

const PKG_DEPS = readJsonIfExists(PKG_DEPS_PATH) || {}

function unique(arr) {
  return [...new Set(arr)]
}

function sortBy(a, b) {
  return a.localeCompare(b)
}

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

function ensureDir(dirPath) {
  if (!DRY_RUN && !fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function writeFile(filePath, content) {
  if (DRY_RUN) return
  fs.writeFileSync(filePath, content)
}

function findClassName(sourceCode) {
  const matched = sourceCode.match(/class\s+(\w+)\s+extends/)
  return matched ? matched[1] : null
}

function getPackageNames() {
  return Object.keys(PKG_DEPS).sort(sortBy)
}

function getFileStem(packageName, moduleName) {
  if (moduleName === 'index' && packageName === 'index') return 'root'
  if (moduleName === 'index') return packageName
  return moduleName
}

function getPkgDepsPackage(packageName) {
  if (PKG_DEPS[packageName]) return PKG_DEPS[packageName]
  const normalized = packageName.replace(/-/g, '')
  const matchedKey = Object.keys(PKG_DEPS).find((key) => key.replace(/-/g, '') === normalized)
  return matchedKey ? PKG_DEPS[matchedKey] : null
}

function getPkgDepsComponentMetas(packageName) {
  const pkgMeta = getPkgDepsPackage(packageName)
  if (!pkgMeta || !pkgMeta.components || typeof pkgMeta.components !== 'object') return []
  return Object.values(pkgMeta.components)
    .filter((item) => item && typeof item.src === 'string')
    .sort((a, b) => {
      if (a.src === 'index' && b.src !== 'index') return -1
      if (a.src !== 'index' && b.src === 'index') return 1
      return String(a.src).localeCompare(String(b.src))
    })
}

function createComponentDefinition(packageName, componentMeta, typesSourceCode) {
  const moduleName = componentMeta.src
  const tag = `dora-${componentMeta.dir}`
  const moduleFilePath = path.join(PACKAGES_ROOT, `miniprogram.${packageName}`, 'src', `${moduleName}.ts`)
  const moduleSourceCode = readFileIfExists(moduleFilePath)
  if (!moduleSourceCode) return null

  const className = (componentMeta && componentMeta.name) || findClassName(moduleSourceCode)
  if (!className) return null

  const propsName = `${className}Props`
  const exposeName = `${className}Expose`
  const hasNativeTypes = typesSourceCode.includes(propsName) && typesSourceCode.includes(exposeName)
  const fileStem = getFileStem(packageName, moduleName)
  const componentKey = moduleName === 'index' ? packageName : moduleName
  const componentDir = (componentMeta && componentMeta.dir) || (moduleName === 'index' ? packageName : moduleName)
  const compoundSlot = (componentMeta && componentMeta.slot) || null

  return {
    packageName,
    moduleName,
    fileStem,
    tag,
    className,
    propsName,
    exposeName,
    hasNativeTypes,
    componentKey,
    componentDir,
    compoundSlot,
  }
}

function buildTypesFile(definitions, packageName) {
  const lines = []
  const nativeDefs = definitions.filter((item) => item.hasNativeTypes)

  if (nativeDefs.length > 0) {
    const nativeSpecifiers = []
    for (const item of nativeDefs) {
      nativeSpecifiers.push(`${item.propsName} as Native${item.propsName}`)
      nativeSpecifiers.push(`${item.exposeName} as Native${item.exposeName}`)
    }
    lines.push(`import type { ${unique(nativeSpecifiers).join(', ')} } from '@doraemon-ui/miniprogram.${packageName}'`)
  }

  // eslint-disable-next-line quotes
  lines.push("import type { BasicComponent } from '@/types'")
  lines.push('')

  definitions.forEach((item, index) => {
    if (item.hasNativeTypes) {
      lines.push(`export interface ${item.propsName} extends Native${item.propsName}, BasicComponent {}`)
      lines.push('')
      lines.push(`export interface ${item.exposeName} extends Native${item.exposeName} {}`)
    } else {
      lines.push(`export interface ${item.propsName} extends BasicComponent {}`)
      lines.push('')
      lines.push(`export interface ${item.exposeName} {}`)
    }

    if (index < definitions.length - 1) {
      lines.push('')
    }
  })

  lines.push('')
  return `${lines.join('\n')}`
}

function buildHostFile(definition) {
  return [
    // eslint-disable-next-line quotes
    "import { createHostComponent } from '@/hooks/hostComponent'",
    `import type { ${definition.propsName}, ${definition.exposeName} } from './types'`,
    '',
    `export const ${definition.className} = createHostComponent<${definition.propsName}, ${definition.exposeName}>('${definition.tag}')`,
    '',
    `${definition.className}.displayName = 'Dora${definition.className}'`,
    '',
  ].join('\n')
}

function buildBarrelFile(definitions) {
  if (definitions.length === 1) {
    const [item] = definitions
    return [
      `import { ${item.className} } from './${item.fileStem}'`,
      '',
      // `export { ${item.className} }`,
      `export type { ${item.propsName}, ${item.exposeName} } from './types'`,
      '',
      `export default ${item.className}`,
      '',
    ].join('\n')
  }

  const lines = definitions.map((item) => `export * from './${item.fileStem}'`)
  // eslint-disable-next-line quotes
  lines.push("export type * from './types'")
  lines.push('')
  return lines.join('\n')
}

function buildCompoundBarrelFile(parentDefinition, childDefinitions) {
  const lines = []
  // eslint-disable-next-line quotes
  lines.push("import type { ForwardRefExoticComponent, RefAttributes } from 'react'")
  lines.push(`import { ${parentDefinition.className} } from './${parentDefinition.fileStem}'`)
  lines.push(`import type { ${parentDefinition.propsName}, ${parentDefinition.exposeName} } from './types'`)
  childDefinitions.forEach((item) => {
    lines.push(`import ${item.className} from '../${item.componentDir}'`)
  })
  lines.push('')
  lines.push(`export type { ${parentDefinition.propsName}, ${parentDefinition.exposeName} }`)
  lines.push('')
  lines.push(
    `type CompoundedComponent = ForwardRefExoticComponent<${parentDefinition.propsName} & RefAttributes<${parentDefinition.exposeName}>> & {`,
  )
  childDefinitions.forEach((item) => {
    lines.push(`  ${item.compoundSlot}: typeof ${item.className}`)
  })
  lines.push('}')
  lines.push('')
  lines.push(`const Inner${parentDefinition.className} = ${parentDefinition.className} as CompoundedComponent`)
  lines.push('')
  childDefinitions.forEach((item) => {
    lines.push(`Inner${parentDefinition.className}.${item.compoundSlot} = ${item.className}`)
  })
  // lines.push('')
  // lines.push(`export { Inner${parentDefinition.className} as ${parentDefinition.className} }`)
  lines.push('')
  lines.push(`export default Inner${parentDefinition.className}`)
  lines.push('')
  return lines.join('\n')
}

function buildJsxDts(allDefinitions) {
  const importByPath = new Map()
  const entries = []

  for (const definition of allDefinitions) {
    const typeImportPath = `./components/${definition.componentDir}/types`
    if (!importByPath.has(typeImportPath)) importByPath.set(typeImportPath, [])
    importByPath.get(typeImportPath).push(definition.propsName)
    entries.push({ tag: definition.tag, propsName: definition.propsName, typeImportPath })
  }

  const importPaths = [...importByPath.keys()].sort(sortBy)
  const imports = importPaths.map((importPath) => {
    const names = unique(importByPath.get(importPath)).sort(sortBy)
    return `import type { ${names.join(', ')} } from '${importPath}'`
  })

  const groupedEntries = []
  for (const importPath of importPaths) {
    const packageName = importPath.split('/')[2]
    const packageEntries = entries
      .filter((item) => item.typeImportPath === importPath)
      .sort((a, b) => {
        const mainTag = `dora-${packageName}`
        if (a.tag !== mainTag && b.tag === mainTag) return -1
        if (a.tag === mainTag && b.tag !== mainTag) return 1
        return a.tag.localeCompare(b.tag)
      })
    groupedEntries.push(...packageEntries)
  }

  const jsxLines = groupedEntries.map((item) => `      '${item.tag}': ${item.propsName}`)

  return [
    ...imports,
    '',
    'declare global {',
    '  namespace JSX {',
    '    interface IntrinsicElements {',
    ...jsxLines,
    '    }',
    '  }',
    '}',
    '',
    'export {}',
    '',
  ].join('\n')
}

function buildEntryIndex(componentDirs) {
  const sortedDirs = componentDirs.sort(sortBy)
  const toIdentifier = (name) =>
    name
      .split('-')
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('')

  const imports = sortedDirs.map((name) => `import ${toIdentifier(name)} from '@/components/${name}'`)
  const exports = sortedDirs.map((name) => `export * from '@/components/${name}'`)
  const namedExports = sortedDirs.map((name) => toIdentifier(name))

  const lines = [...imports, '', ...exports, '', 'export {', `  ${namedExports.join(',\n  ')}`, '}']
  lines.push('')
  return lines.join('\n')
}

function updatePackageDependencies(packageNames) {
  const pkg = readJsonIfExists(PACKAGE_JSON_PATH)
  if (!pkg) return

  const existed = pkg.dependencies || {}
  const merged = { ...existed }
  for (const packageName of packageNames) {
    merged[`@doraemon-ui/miniprogram.${packageName}`] = 'workspace:*'
  }

  pkg.dependencies = Object.fromEntries(Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)))

  if (!pkg.scripts) pkg.scripts = {}
  if (!pkg.scripts['build:components']) {
    pkg.scripts['build:components'] = 'node build-components.js'
  }
  pkg.scripts = Object.fromEntries(Object.entries(pkg.scripts).sort(([a], [b]) => a.localeCompare(b)))

  writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(pkg, null, 2)}\n`)
}

function main() {
  ensureDir(TARO_COMPONENTS_ROOT)

  const packageNames = getPackageNames()
  const allDefinitions = []
  const usedComponentDirs = []
  const usedPackages = []

  for (const packageName of packageNames) {
    const packageSrcRoot = path.join(PACKAGES_ROOT, `miniprogram.${packageName}`, 'src')
    const typesFilePath = path.join(packageSrcRoot, 'types.ts')
    const typesSourceCode = readFileIfExists(typesFilePath)
    if (!typesSourceCode) continue

    const componentMetas = getPkgDepsComponentMetas(packageName)
    const definitions = componentMetas.map((item) => createComponentDefinition(packageName, item, typesSourceCode)).filter(Boolean)

    if (definitions.length === 0) continue

    const parentDefinition = definitions.find((item) => item.moduleName === 'index')
    const childDefinitions = definitions.filter((item) => item.moduleName !== 'index' && item.compoundSlot)
    const hasCompound = Boolean(parentDefinition) && childDefinitions.length > 0

    if (hasCompound) {
      const parentDir = path.join(TARO_COMPONENTS_ROOT, parentDefinition.componentDir)
      ensureDir(parentDir)
      writeFile(path.join(parentDir, 'types.ts'), buildTypesFile([parentDefinition], packageName))
      writeFile(path.join(parentDir, 'index.tsx'), buildCompoundBarrelFile(parentDefinition, childDefinitions))
      writeFile(path.join(parentDir, `${parentDefinition.fileStem}.tsx`), buildHostFile(parentDefinition))
      usedComponentDirs.push(parentDefinition.componentDir)

      for (const childDefinition of childDefinitions) {
        const childDir = path.join(TARO_COMPONENTS_ROOT, childDefinition.componentDir)
        ensureDir(childDir)
        writeFile(path.join(childDir, 'types.ts'), buildTypesFile([childDefinition], packageName))
        writeFile(path.join(childDir, 'index.tsx'), buildBarrelFile([childDefinition]))
        writeFile(path.join(childDir, `${childDefinition.fileStem}.tsx`), buildHostFile(childDefinition))
        usedComponentDirs.push(childDefinition.componentDir)
      }
    } else {
      const definitionsByDir = new Map()
      for (const definition of definitions) {
        const list = definitionsByDir.get(definition.componentDir) || []
        list.push(definition)
        definitionsByDir.set(definition.componentDir, list)
      }

      for (const [componentDirName, componentDefs] of definitionsByDir.entries()) {
        const componentDir = path.join(TARO_COMPONENTS_ROOT, componentDirName)
        ensureDir(componentDir)
        writeFile(path.join(componentDir, 'types.ts'), buildTypesFile(componentDefs, packageName))
        writeFile(path.join(componentDir, 'index.tsx'), buildBarrelFile(componentDefs))
        for (const definition of componentDefs) {
          writeFile(path.join(componentDir, `${definition.fileStem}.tsx`), buildHostFile(definition))
        }
        usedComponentDirs.push(componentDirName)
      }
    }

    allDefinitions.push(...definitions)
    usedPackages.push(packageName)
    console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] component: ${packageName}`)
  }

  if (allDefinitions.length === 0) {
    console.log('no components generated')
    return
  }

  writeFile(JSX_DTS_PATH, buildJsxDts(allDefinitions))
  writeFile(ENTRY_INDEX_PATH, buildEntryIndex(unique(usedComponentDirs)))
  updatePackageDependencies(unique(usedPackages))

  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: src/jsx.d.ts`)
  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: src/index.ts`)
  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: package.json dependencies`)
}

main()
