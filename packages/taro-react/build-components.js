/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const DRY_RUN = process.argv.includes('--dry-run')

const TARO_ROOT = __dirname
const REPO_ROOT = path.resolve(TARO_ROOT, '../..')
const PACKAGES_ROOT = path.join(REPO_ROOT, 'packages')
const PKG_DEPS_PATH = path.join(REPO_ROOT, 'miniprogram.pkg-deps.json')
const TARO_SRC_ROOT = path.join(TARO_ROOT, 'src')
const TARO_COMPONENTS_ROOT = path.join(TARO_SRC_ROOT, 'components')
const JSX_DTS_PATH = path.join(TARO_SRC_ROOT, 'jsx.d.ts')
const ENTRY_INDEX_PATH = path.join(TARO_SRC_ROOT, 'index.ts')
const PROPS_REGISTRY_PATH = path.join(TARO_SRC_ROOT, 'component-props-registry.ts')
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
  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) return null
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

/**
 * Extract property names and their type annotations from a TypeScript interface definition.
 * Handles nested braces via brace counting. Returns [{name, type}] pairs.
 */
function extractInterfaceMembers(sourceCode, interfaceName) {
  const startRegex = new RegExp(`export\\s+interface\\s+${interfaceName}\\s*(?:extends\\s+[^{]+)?\\{`)
  const startMatch = sourceCode.match(startRegex)
  if (!startMatch) return []

  const startIndex = startMatch.index + startMatch[0].length - 1 // position of '{'
  let braceCount = 1
  let i = startIndex + 1

  while (braceCount > 0 && i < sourceCode.length) {
    if (sourceCode[i] === '{') braceCount++
    else if (sourceCode[i] === '}') braceCount--
    i++
  }

  const body = sourceCode.slice(startIndex + 1, i - 1)
  const members = []
  // Capture property name and type expression (everything after ':' to end of line)
  const propRegex = /^\s*(\w+)(?:\?\s*)?:\s*(.+)$/gm
  let propMatch
  while ((propMatch = propRegex.exec(body)) !== null) {
    const typeExpr = propMatch[2].trim().replace(/\s*\/\/.*$/, '').trim()
    members.push({ name: propMatch[1], type: typeExpr })
  }

  return members
}

/**
 * Map TypeScript type expression to a literal default value for Taro's createElement registry.
 * The registry values are only parsed by TaroNormalModulesPlugin (AST-level, not runtime),
 * so these defaults just need to be syntactically valid literal expressions.
 */
function getDefaultValue(typeExpr) {
  const t = typeExpr.trim()

  // Simple primitive types
  if (t === 'string') return "''"
  if (t === 'boolean') return 'false'
  if (t === 'number') return '0'
  if (t === 'undefined') return 'undefined'
  if (t === 'null') return 'null'

  // Array types: string[], T[], Array<T>, T[] | null
  if (/\[\]$/.test(t) || /^Array\s*[<]/.test(t)) return '[]'

  // Object-like types: object, {}, Partial<T>, Record<K,V>, Omit<T,K>, etc.
  if (t === 'object' || t === '{}') return '{}'
  if (/^(Partial|Record|Omit|Pick|Required|Readonly|Exclude|Extract|NonNullable)\s*[<]/.test(t)) return '{}'

  // Union types — estimate from the first non-complex member
  if (t.includes('|')) {
    const parts = t.split('|').map(s => s.trim())
    // Detect unions mixing primitive string with object-like types (e.g. string | Partial<T>)
    // These are common for CSS/styling props. Returning '' for Object-typed native props
    // causes WeChat devtools type warnings: "expected <Object> but got non-object value"
    const hasString = parts.includes('string')
    const hasObjectLike = parts.some(p => /^(Partial|Record|Omit|Pick|CSS)/.test(p) || p === 'object' || p === '{}')
    if (hasString && hasObjectLike) return 'null'
    // If any part is a string literal ('xxx'), default to that
    const strLit = parts.find(p => /^'[^']*'$/.test(p))
    if (strLit) return strLit
    // If any part is 'null', skip it and check the next
    const nonNull = parts.filter(p => p !== 'null')
    if (nonNull.length > 0) return getDefaultValue(nonNull[0])
  }

  // String literal type
  if (/^'[^']*'$/.test(t)) return t

  // Reference types — assume string-like by default
  return "''"
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

  // Extract prop names and types from the native Props interface
  const propNames = extractInterfaceMembers(typesSourceCode, propsName)

  // Extract actual default values from the component's props definition
  const propDefaults = extractPropsDefaults(moduleSourceCode, path.dirname(moduleFilePath))

  // Merge: use actual defaults where available, fall back to type-based defaults
  const propNamesWithDefaults = propNames.map(p => {
    let defaultValue = (propDefaults && propDefaults[p.name] !== undefined) ? propDefaults[p.name] : getDefaultValue(p.type)
    // Override empty-string defaults for mixed string|object-like union types.
    // Native components often declare default: '' (fine for their own props), but when
    // the value is forwarded to child components with @Prop type: Object, WeChat devtools
    // emit type-mismatch warnings ("expected <Object> but got non-object value").
    // Using null avoids the warning and preserves the same "no style" semantics.
    if (defaultValue === "''" && /^string\s*\|\s*(?:Partial|Record|CSS|Omit|Pick)\b/.test(p.type)) {
      defaultValue = 'null'
    }
    return { name: p.name, type: p.type, defaultValue }
  })

  // Extract emitted events from component source to generate event handler props
  const emitEvents = extractEmitEvents(moduleSourceCode)
  const eventHandlerProps = emitEvents.map(eventName => ({
    name: 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1),
    eventName,
  }))

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
    propNames: propNamesWithDefaults,
    eventHandlerProps,
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
  lines.push("import type { BasicComponent } from '../../types'")
  lines.push('')

  definitions.forEach((item, index) => {
    const eventHandlers = (item.eventHandlerProps || []).map(ep => `  ${ep.name}?: (event: any) => void`)

    if (item.hasNativeTypes) {
      if (eventHandlers.length > 0) {
        lines.push(`export interface ${item.propsName} extends Native${item.propsName}, BasicComponent {`)
        eventHandlers.forEach(hl => lines.push(hl))
        lines.push('}')
      } else {
        lines.push(`export interface ${item.propsName} extends Native${item.propsName}, BasicComponent {}`)
      }
      lines.push('')
      lines.push(`export interface ${item.exposeName} extends Native${item.exposeName} {}`)
    } else {
      if (eventHandlers.length > 0) {
        lines.push(`export interface ${item.propsName} extends BasicComponent {`)
        eventHandlers.forEach(hl => lines.push(hl))
        lines.push('}')
      } else {
        lines.push(`export interface ${item.propsName} extends BasicComponent {}`)
      }
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
  const hasDefaults = definition.propNames && definition.propNames.length > 0
  let defaultPropsArg = ''
  if (hasDefaults) {
    const entries = definition.propNames.map(p => `  ${p.name}: ${p.defaultValue}`)
    defaultPropsArg = `,\n{\n${entries.join(',\n')},\n}`
  }

  return [
    // eslint-disable-next-line quotes
    "import { createHostComponent } from '../../hooks/hostComponent'",
    `import type { ${definition.propsName}, ${definition.exposeName} } from './types'`,
    '',
    `export const ${definition.className} = createHostComponent<${definition.propsName}, ${definition.exposeName}>('${definition.tag}'${defaultPropsArg})`,
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

  const imports = sortedDirs.map((name) => `import ${toIdentifier(name)} from './components/${name}'`)
  const exports = sortedDirs.map((name) => `export * from './components/${name}'`)
  const namedExports = sortedDirs.map((name) => toIdentifier(name))

  const lines = [
    ...imports,
    "import './component-props-registry'",
    '',
    ...exports,
    '',
    'export {',
    `  ${namedExports.join(',\n  ')}`,
    '}',
  ]
  lines.push('')
  return lines.join('\n')
}

/**
 * Build the component props registry file.
 * This file uses React.createElement() calls to register component prop names
 * with Taro's AST parser (TaroNormalModulesPlugin). Without this registration,
 * props passed through {nativeProps} spreads are invisible to Taro's WXML
 * template generator, and native mini-program components never receive them.
 */
/**
 * Serialize a TypeScript AST literal node to its string representation.
 * Returns null for non-serializable nodes (arrow functions, spreads, etc.).
 */
function serializeTsLiteral(node, constObjects) {
  if (!node) return null
  if (ts.isStringLiteral(node)) {
    return `'${node.text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
  }
  if (ts.isNumericLiteral(node)) return node.text
  if (node.kind === ts.SyntaxKind.TrueKeyword) return 'true'
  if (node.kind === ts.SyntaxKind.FalseKeyword) return 'false'
  if (node.kind === ts.SyntaxKind.NullKeyword) return 'null'
  if (node.kind === ts.SyntaxKind.UndefinedKeyword) return 'undefined'
  if (ts.isArrayLiteralExpression(node)) {
    if (node.elements.length === 0) return '[]'
    const elements = []
    for (const el of node.elements) {
      if (ts.isSpreadElement(el)) return null
      const s = serializeTsLiteral(el, constObjects)
      if (s === null) return null
      elements.push(s)
    }
    return `[${elements.join(', ')}]`
  }
  if (ts.isObjectLiteralExpression(node)) {
    if (node.properties.length === 0) return '{}'
    const props = []
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const key = prop.name.kind === ts.SyntaxKind.ComputedPropertyName
          ? `[${prop.name.getText()}]`
          : prop.name.getText()
        const val = serializeTsLiteral(prop.initializer, constObjects)
        if (val === null) return null
        props.push(`${key}: ${val}`)
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        props.push(prop.name.getText())
      } else if (ts.isSpreadAssignment(prop)) {
        // Resolve ...identifier from constObjects
        if (ts.isIdentifier(prop.expression) && constObjects && constObjects[prop.expression.text]) {
          const spreadObj = constObjects[prop.expression.text]
          for (const [key, val] of Object.entries(spreadObj)) {
            props.push(`${key}: ${val}`)
          }
        } else {
          return null // Can't resolve spread
        }
      } else {
        return null
      }
    }
    return `{ ${props.join(', ')} }`
  }
  // Negative numeric literal: -22
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
    return `-${node.operand.text}`
  }
  // ArrowFunction with array body: () => []
  if (ts.isArrowFunction(node) && ts.isArrayLiteralExpression(node.body)) {
    return serializeTsLiteral(node.body, constObjects)
  }
  // ArrowFunction with object body: () => ({ ... })
  if (ts.isArrowFunction(node) && ts.isParenthesizedExpression(node.body) && ts.isObjectLiteralExpression(node.body.expression)) {
    return serializeTsLiteral(node.body.expression, constObjects)
  }
  // ArrowFunction with identifier body: () => someVar
  if (ts.isArrowFunction(node) && ts.isIdentifier(node.body)) {
    return null
  }
  // FunctionExpression, etc. — not serializable
  return null
}

/**
 * Collect literal key-value pairs from a TypeScript ObjectLiteralExpression AST node.
 */
function collectObjectLiterals(tsObj, target) {
  for (const prop of tsObj.properties) {
    if (ts.isPropertyAssignment(prop)) {
      const key = prop.name.getText()
      const val = serializeTsLiteral(prop.initializer)
      if (val !== null) target[key] = val
    }
  }
}

/**
 * Parse source code for all referenceable definitions: `const defaults = { ... }`,
 * `export const NAME = 'literal'`, and follows imports.
 * Returns a key-value map for XXX reference resolution.
 */
function extractDefaultsLookupFromAST(sourceCode, srcDir) {
  const lookup = {}
  const constObjects = {}
  const enumLookup = {}
  const sourceFile = ts.createSourceFile('lookup.ts', sourceCode, ts.ScriptTarget.Latest, true)

  // Collect all const/export const literal declarations
  function collectVariableDeclarations(sf) {
    ts.forEachChild(sf, node => {
      if (ts.isVariableStatement(node)) {
        for (const decl of node.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            if (decl.initializer && ts.isObjectLiteralExpression(decl.initializer)) {
              collectObjectLiterals(decl.initializer, lookup)
              // Also build per-name object map for spread resolution
              const obj = {}
              collectObjectLiterals(decl.initializer, obj)
              if (Object.keys(obj).length > 0) constObjects[name] = obj
            } else if (decl.initializer) {
              const val = serializeTsLiteral(decl.initializer)
              if (val !== null) lookup[name] = val
            }
          }
        }
      }
    })
  }

  // Collect all enum declarations
  function collectEnumDeclarations(sf) {
    ts.forEachChild(sf, node => {
      if (ts.isEnumDeclaration(node)) {
        const enumName = node.name.text
        for (const member of node.members) {
          const memberName = member.name.getText()
          if (member.initializer) {
            const val = serializeTsLiteral(member.initializer)
            if (val !== null) enumLookup[`${enumName}.${memberName}`] = val
          }
        }
      }
    })
  }

  // Collect inline declarations
  collectVariableDeclarations(sourceFile)
  collectEnumDeclarations(sourceFile)

  // Follow imports: import { X } from './Y'
  ts.forEachChild(sourceFile, node => {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause
      if (clause && clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const spec of clause.namedBindings.elements) {
          const importedName = spec.name.text
          const modPath = node.moduleSpecifier.text
          for (const ext of ['.ts', '.js', '']) {
            const filePath = path.resolve(srcDir, modPath + ext)
            const fileSource = readFileIfExists(filePath)
            if (fileSource) {
              const importedSF = ts.createSourceFile('imported.ts', fileSource, ts.ScriptTarget.Latest, true)
              collectVariableDeclarations(importedSF)
              collectEnumDeclarations(importedSF)
            }
          }
        }
      }
    }
  })

  const result = {}
  if (Object.keys(lookup).length > 0) result.lookup = lookup
  if (Object.keys(constObjects).length > 0) result.constObjects = constObjects
  if (Object.keys(enumLookup).length > 0) result.enumLookup = enumLookup
  return Object.keys(result).length > 0 ? result : null
}

/**
 * Read props from an imported props file referenced by `@Component({ props })`.
 * Given `import { props } from './props'`, follow the import and parse the exported object.
 */
function extractImportedComponentProps(sourceCode, srcDir, identifierName, defaultsLookup, constObjects, enumLookup) {
  const sourceFile = ts.createSourceFile('find-import.ts', sourceCode, ts.ScriptTarget.Latest, true)
  let importPath = null

  // Find the import
  ts.forEachChild(sourceFile, node => {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause
      if (clause && clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const spec of clause.namedBindings.elements) {
          if (spec.name.text === identifierName) {
            importPath = node.moduleSpecifier.text
          }
        }
      }
    }
  })

  if (!importPath) return null

  // Read the imported file
  for (const ext of ['.ts', '.js', '']) {
    const filePath = path.resolve(srcDir, importPath + ext)
    const fileSource = readFileIfExists(filePath)
    if (!fileSource) continue

    const importedSF = ts.createSourceFile('props-file.ts', fileSource, ts.ScriptTarget.Latest, true)
    let result = null

    // Find export const identifierName = { propName: { type: ..., default: ... }, ... }
    ts.forEachChild(importedSF, node => {
      if (ts.isVariableStatement(node) && node.modifiers) {
        const isExport = node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
        if (!isExport) return
        for (const decl of node.declarationList.declarations) {
          if (ts.isIdentifier(decl.name) && decl.name.text === identifierName) {
            if (decl.initializer && ts.isObjectLiteralExpression(decl.initializer)) {
              const props = {}
              for (const prop of decl.initializer.properties) {
                if (ts.isPropertyAssignment(prop)) {
                  const propName = prop.name.getText()
                  if (ts.isObjectLiteralExpression(prop.initializer)) {
                    const defaultEntry = prop.initializer.properties.find(p =>
                      ts.isPropertyAssignment(p) && p.name.getText() === 'default'
                    )
                    if (defaultEntry) {
                      const value = resolveDecoratorDefault(defaultEntry.initializer, defaultsLookup, constObjects, enumLookup)
                      if (value !== null) props[propName] = value
                    }
                  }
                }
              }
              result = Object.keys(props).length > 0 ? props : null
            }
          }
        }
      }
    })

    if (result) return result
  }

  return null
}

/**
 * Find decorators on a node in TS 6.x+ where decorators are child nodes, not node.decorators.
 */
function findDecorators(node) {
  const decorators = []
  ts.forEachChild(node, child => {
    if (ts.isDecorator(child)) decorators.push(child)
  })
  return decorators
}

/**
 * Resolve a Prop/Component decorator's default value AST node to a string literal.
 * Handles defaults.XXX references using the defaultsLookup map.
 */
function resolveDecoratorDefault(node, defaultsLookup, constObjects, enumLookup) {
  // defaults.XXX reference
  if (ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'defaults' &&
      defaultsLookup && defaultsLookup[node.name.text] !== undefined) {
    return defaultsLookup[node.name.text]
  }
  // Enum member reference like AnimateType.TRANSITION
  if (ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      enumLookup) {
    const key = `${node.expression.text}.${node.name.text}`
    if (enumLookup[key] !== undefined) return enumLookup[key]
  }
  // Plain identifier reference like DATETIME
  if (ts.isIdentifier(node) && defaultsLookup && defaultsLookup[node.text] !== undefined) {
    return defaultsLookup[node.text]
  }
  return serializeTsLiteral(node, constObjects)
}

/**
 * Extract all prop defaults from a component's source code using TypeScript AST parsing.
 * Handles @Component({ props: { ... } }), @Prop() decorators, and defaults objects.
 */
function extractPropsDefaults(sourceCode, srcDir) {
  const mergedDefaults = {}

  // Step 1: Build defaults lookup for defaults.XXX reference resolution
  const defaultsData = extractDefaultsLookupFromAST(sourceCode, srcDir)
  const defaultsLookup = defaultsData && defaultsData.lookup ? defaultsData.lookup : null
  const constObjects = defaultsData && defaultsData.constObjects ? defaultsData.constObjects : null
  const enumLookup = defaultsData && defaultsData.enumLookup ? defaultsData.enumLookup : null

  // Step 2: Parse the source into an AST
  const sourceFile = ts.createSourceFile('comp.ts', sourceCode, ts.ScriptTarget.Latest, true)

  // Step 3: Find the class declaration
  let classDeclaration = null
  ts.forEachChild(sourceFile, node => {
    if (ts.isClassDeclaration(node)) classDeclaration = node
  })

  if (!classDeclaration) {
    // No class found — merge defaultsLookup directly as best effort
    if (defaultsLookup) Object.assign(mergedDefaults, defaultsLookup)
    return Object.keys(mergedDefaults).length > 0 ? mergedDefaults : null
  }

  // Step 4: Extract from @Component({ props: { ... } }) or @Component({ props: importedRef })
  const classDecorators = findDecorators(classDeclaration)
  if (classDecorators.length > 0) {
    for (const decorator of classDecorators) {
      if (ts.isCallExpression(decorator.expression)) {
        const callee = decorator.expression.expression
        if (ts.isIdentifier(callee) && callee.text === 'Component') {
          const arg = decorator.expression.arguments[0]
          if (arg && ts.isObjectLiteralExpression(arg)) {
            const propsProp = arg.properties.find(p =>
              (ts.isPropertyAssignment(p) || ts.isShorthandPropertyAssignment(p)) && p.name.getText() === 'props'
            )
            if (propsProp) {
              // Shorthand: @Component({ props }) where props is an imported variable
              if (ts.isShorthandPropertyAssignment(propsProp)) {
                const importedProps = extractImportedComponentProps(sourceCode, srcDir, propsProp.name.text, defaultsLookup, constObjects, enumLookup)
                if (importedProps) Object.assign(mergedDefaults, importedProps)
              // Inline: @Component({ props: { propName: { ... } } })
              } else if (ts.isObjectLiteralExpression(propsProp.initializer)) {
                for (const propEntry of propsProp.initializer.properties) {
                  if (ts.isPropertyAssignment(propEntry)) {
                    const propName = propEntry.name.getText()
                    const propVal = propEntry.initializer
                    if (ts.isObjectLiteralExpression(propVal)) {
                      const defaultEntry = propVal.properties.find(p =>
                        ts.isPropertyAssignment(p) && p.name.getText() === 'default'
                      )
                      if (defaultEntry) {
                        const value = resolveDecoratorDefault(defaultEntry.initializer, defaultsLookup, constObjects, enumLookup)
                        if (value !== null) mergedDefaults[propName] = value
                      }
                    }
                  }
                }
              // Identifier: @Component({ props: someVar })
              } else if (ts.isIdentifier(propsProp.initializer)) {
                const importedProps = extractImportedComponentProps(sourceCode, srcDir, propsProp.initializer.text, defaultsLookup, constObjects, enumLookup)
                if (importedProps) Object.assign(mergedDefaults, importedProps)
              }
            }
          }
        }
      }
    }
  }

  // Step 5: Extract from @Prop() decorators on class members
  for (const member of classDeclaration.members) {
    const memberDecorators = findDecorators(member)
    if (memberDecorators.length === 0) continue
    if (!ts.isPropertyDeclaration(member)) continue
    if (!member.name || !ts.isIdentifier(member.name)) continue
    const memberName = member.name.text

    for (const decorator of memberDecorators) {
      if (ts.isCallExpression(decorator.expression)) {
        const callee = decorator.expression.expression
        if (ts.isIdentifier(callee) && callee.text === 'Prop') {
          const arg = decorator.expression.arguments[0]
          if (arg && ts.isObjectLiteralExpression(arg)) {
            const defaultEntry = arg.properties.find(p =>
              ts.isPropertyAssignment(p) && p.name.getText() === 'default'
            )
            if (defaultEntry) {
              const value = resolveDecoratorDefault(defaultEntry.initializer, defaultsLookup, constObjects, enumLookup)
              if (value !== null) mergedDefaults[memberName] = value
            }
          }
        }
      }
    }
  }

  // Step 6: Fill in any remaining keys from defaultsLookup that weren't set by decorators
  if (defaultsLookup) {
    for (const [key, val] of Object.entries(defaultsLookup)) {
      if (mergedDefaults[key] === undefined) {
        mergedDefaults[key] = val
      }
    }
  }

  return Object.keys(mergedDefaults).length > 0 ? mergedDefaults : null
}

/**
 * Extract emitted event names from a component's source code.
 * Scans for this.$emit('eventName', ...) calls with static string literals.
 * Returns unique event names like ['change', 'close', 'confirm'].
 */
function extractEmitEvents(sourceCode) {
  const events = new Set()
  const regex = /this\.\$emit\(['"]([a-zA-Z]\w*)['"]/g
  let match
  while ((match = regex.exec(sourceCode)) !== null) {
    events.add(match[1])
  }
  return [...events]
}

function buildPropsRegistry(registryEntries) {
  const lines = [
    "// This file registers component props with Taro's WXML template generator.",
    '// It is parsed by TaroNormalModulesPlugin at build time to discover',
    '// third-party component prop names.',
    "import React from 'react'",
    '',
  ]

  for (const entry of registryEntries) {
    if (!entry.propNames || entry.propNames.length === 0) continue

    const propLines = entry.propNames.map(({ name, defaultValue }) => `  ${name}: ${defaultValue}`)
    lines.push(
      `// ${entry.tag}`,
      `React.createElement('${entry.tag}', {`,
      `${propLines.join(',\n')},`,
      '})',
      '',
    )
  }

  lines.push('// End of props registry')
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

  // Generate component props registry for Taro WXML template generator
  const registryEntries = allDefinitions.map((d) => {
    const allPropNames = [...(d.propNames || [])]
    if (d.eventHandlerProps && d.eventHandlerProps.length > 0) {
      for (const ep of d.eventHandlerProps) {
        allPropNames.push({ name: ep.name, defaultValue: 'undefined' })
      }
    }
    return { tag: d.tag, propNames: allPropNames }
  }).filter((d) => d.propNames.length > 0)
  writeFile(PROPS_REGISTRY_PATH, buildPropsRegistry(registryEntries))

  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: src/jsx.d.ts`)
  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: src/index.ts`)
  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: src/component-props-registry.ts`)
  console.log(`[${DRY_RUN ? 'dry-run' : 'write'}] updated: package.json dependencies`)
}

main()
