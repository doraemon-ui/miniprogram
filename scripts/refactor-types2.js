/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const REPO_ROOT = process.cwd()
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages')

const EXCLUDE_PACKAGES = new Set(['miniprogram.core-js', 'miniprogram.shared'])

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function writeText(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, text)
}

function listMiniprogramPackages() {
  const names = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => name.startsWith('miniprogram.'))
    .filter((name) => !EXCLUDE_PACKAGES.has(name))
    .sort()

  return names.map((name) => ({
    name,
    dir: path.join(PACKAGES_DIR, name),
  }))
}

function ensurePackageIndexDts(pkgDir) {
  const indexDtsPath = path.join(pkgDir, 'index.d.ts')
  const required = ["export * from './src'", "export type * from './src/types'"]

  if (!fs.existsSync(indexDtsPath)) {
    writeText(indexDtsPath, `${required[0]}\n\n${required[1]}\n`)
    return { changed: true, created: true }
  }

  const raw = readText(indexDtsPath)
  const hasExportStar = raw.includes(required[0])
  const hasExportTypeStar = raw.includes(required[1])
  if (hasExportStar && hasExportTypeStar) return { changed: false, created: false }

  let next = raw
  if (!hasExportStar) {
    next = `${required[0]}\n\n${next.trimEnd()}\n`
  }
  if (!hasExportTypeStar) {
    next = `${next.trimEnd()}\n\n${required[1]}\n`
  }
  writeText(indexDtsPath, next)
  return { changed: true, created: false }
}

function getInterfaceBlockRange(text, interfaceName) {
  const marker = `export interface ${interfaceName}`
  const start = text.indexOf(marker)
  if (start < 0) return null

  const braceStart = text.indexOf('{', start)
  if (braceStart < 0) return null

  let i = braceStart
  let depth = 0
  while (i < text.length) {
    const ch = text[i]
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) {
        return { start, braceStart, end: i }
      }
    }
    i += 1
  }
  return null
}

function extractJsdocParts(jsdocLines) {
  const desc = []
  const tags = []

  for (const rawLine of jsdocLines) {
    const line = rawLine.trim()
    if (line === '/**' || line === '*/') continue

    const body = line.startsWith('*') ? line.slice(1).trimStart() : line
    if (!body) continue

    if (body.startsWith('@')) tags.push(body)
    else desc.push(body)
  }

  const filteredTags = tags.filter((t) => !t.startsWith('@type') && !t.startsWith('@return') && !t.startsWith('@memberof'))
  return { desc, tags: filteredTags }
}

function listSrcTsFiles(srcDir) {
  if (!fs.existsSync(srcDir)) return []
  return fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.ts'))
    .map((d) => path.join(srcDir, d.name))
}

function buildSourceJsdocMap(pkgDir) {
  const srcDir = path.join(pkgDir, 'src')
  const files = listSrcTsFiles(srcDir)
  const map = new Map()

  for (const filePath of files) {
    const text = readText(filePath)
    const classMatches = []
    for (const m of text.matchAll(/class\s+([A-Za-z_]\w*)\s+extends\s+/g)) {
      classMatches.push({ name: m[1], index: m.index })
    }

    const blocks = text.matchAll(/\/\*\*[\s\S]*?\*\//g)
    for (const b of blocks) {
      const blockText = b[0]
      const memberOf = blockText.match(/@memberof\s+([A-Za-z_]\w*)/m)

      const blockIndex = b.index ?? 0
      let classNameFromContext = null
      for (let i = classMatches.length - 1; i >= 0; i -= 1) {
        if (classMatches[i].index < blockIndex) {
          classNameFromContext = classMatches[i].name
          break
        }
      }

      const className = classNameFromContext || (memberOf ? memberOf[1] : null)
      if (!className) continue

      const after = text.slice(b.index + blockText.length, b.index + blockText.length + 400)
      const nameMatch = after.match(
        /^(?:\s*@[A-Za-z_]\w*(?:\([\s\S]*?\))?\s*)*(?:\s*(?:public|protected|private)\s+)?(?:\s*(?:readonly|static)\s+)*\s*([A-Za-z_]\w*)\s*(?:!?\s*:\s*|\s*\()/m,
      )
      if (!nameMatch) continue

      const memberName = nameMatch[1]
      const key = `${className}.${memberName}`
      if (!map.has(key)) {
        map.set(key, blockText.split('\n'))
      }
    }
  }

  return map
}

function buildJsdoc({ descLines, extraTags, tailTagLine, indent = '  ' }) {
  const lines = []
  lines.push(`${indent}/**`)

  if (descLines.length > 0) {
    for (const d of descLines) lines.push(`${indent} * ${d}`)
  } else {
    lines.push(`${indent} *`)
  }

  lines.push(`${indent} *`)
  for (const t of extraTags) lines.push(`${indent} * ${t}`)
  lines.push(`${indent} * ${tailTagLine}`)
  lines.push(`${indent} */`)
  return lines.join('\n')
}

function toMethodSignatureIfArrowFunction(memberName, typeText) {
  const m = typeText.match(/^\(\s*([\s\S]*?)\s*\)\s*=>\s*([\s\S]+)$/)
  if (!m) return null
  const params = m[1].trim()
  const ret = m[2].trim()
  return {
    signature: `${memberName}(${params}): ${ret}`,
    returnType: ret,
  }
}

function parseMemberLine(line) {
  const trimmed = line.trim().replace(/[,;]\s*$/, '')

  // method: foo(a: A): R
  const mm = trimmed.match(/^([A-Za-z_]\w*)\s*\(([\s\S]*)\)\s*:\s*([\s\S]+)$/)
  if (mm) {
    return {
      kind: 'method',
      name: mm[1],
      paramsText: mm[2].trim(),
      returnTypeText: mm[3].trim(),
      raw: trimmed,
    }
  }

  // property: foo?: T
  const pm = trimmed.match(/^([A-Za-z_]\w*)\s*\??:\s*([\s\S]+)$/)
  if (pm) {
    return {
      kind: 'property',
      name: pm[1],
      typeText: pm[2].trim(),
      raw: trimmed,
    }
  }

  return null
}

function normalizeInterfaceBody(interfaceName, bodyText, sourceJsdocMap) {
  const isProps = interfaceName.endsWith('Props')
  const isExpose = interfaceName.endsWith('Expose')
  const className = isProps ? interfaceName.slice(0, -'Props'.length) : isExpose ? interfaceName.slice(0, -'Expose'.length) : null

  const lines = bodyText.split('\n')
  const out = []

  let i = 0
  while (i < lines.length) {
    let line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }

    // capture jsdoc if present
    let jsdocLines = null
    if (line.trim().startsWith('/**')) {
      jsdocLines = []
      while (i < lines.length) {
        jsdocLines.push(lines[i])
        if (lines[i].includes('*/')) break
        i += 1
      }
      i += 1
      while (i < lines.length && !lines[i].trim()) i += 1
      line = lines[i] || ''
    }

    const member = parseMemberLine(line)
    if (!member) {
      // keep unknown lines as-is
      out.push(line)
      i += 1
      continue
    }

    const existing = jsdocLines ? extractJsdocParts(jsdocLines) : { desc: [], tags: [] }
    const sourceKey = className ? `${className}.${member.name}` : null
    const sourceLines = sourceKey ? sourceJsdocMap.get(sourceKey) : null
    const fromSource = sourceLines ? extractJsdocParts(sourceLines) : null

    const desc = (fromSource && fromSource.desc.length > 0 ? fromSource.desc : existing.desc) || []
    const tags = (fromSource ? fromSource.tags : existing.tags) || []
    const descLines = desc.length > 0 ? desc : [`${member.name}${isProps ? ' 属性' : ' 方法'}`]

    if (isProps && member.kind === 'property') {
      const typeTagFromSource = sourceLines
        ? sourceLines
            .map((l) => l.trim())
            .find((l) => l.includes('@type'))
            ?.replace(/^\*\s*/, '')
            ?.trim()
        : null

      const jsdoc = buildJsdoc({
        descLines,
        extraTags: tags,
        tailTagLine: typeTagFromSource || `@type {${member.typeText}}`,
      })
      out.push(jsdoc)
      out.push(`  ${member.name}?: ${member.typeText}`)
      out.push('')
      i += 1
      continue
    }

    if (isExpose) {
      // prefer method signature output
      let signatureLine = null
      let returnTypeText = 'void'

      if (member.kind === 'method') {
        signatureLine = `${member.name}(${member.paramsText}): ${member.returnTypeText}`
        returnTypeText = member.returnTypeText
      } else {
        const arrow = toMethodSignatureIfArrowFunction(member.name, member.typeText)
        if (arrow) {
          signatureLine = arrow.signature
          returnTypeText = arrow.returnType
        } else {
          signatureLine = `${member.name}?: ${member.typeText}`
          returnTypeText = member.typeText
        }
      }

      const jsdoc = buildJsdoc({
        descLines,
        extraTags: tags,
        tailTagLine: `@return {${returnTypeText}}`,
      })
      out.push(jsdoc)
      out.push(`  ${signatureLine}`)
      out.push('')
      i += 1
      continue
    }

    // fallback: keep member with regenerated jsdoc best-effort
    const typeText = member.kind === 'method' ? `(${member.paramsText}) => ${member.returnTypeText}` : member.typeText
    const jsdoc = buildJsdoc({
      descLines,
      extraTags: tags,
      tailTagLine: `@type {${typeText}}`,
    })
    out.push(jsdoc)
    out.push(`  ${member.raw}`)
    out.push('')
    i += 1
  }

  // trim trailing blank lines
  while (out.length > 0 && !out[out.length - 1].trim()) out.pop()
  return out.join('\n')
}

function refactorTypesTs(pkgDir) {
  const srcDir = path.join(pkgDir, 'src')
  const typesPath = path.join(srcDir, 'types.ts')
  if (!fs.existsSync(typesPath)) {
    const compName = path.basename(pkgDir).replace(/^miniprogram\./, '')
    const pascal = compName
      .split('-')
      .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
      .join('')

    const content = [
      "import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'",
      `import type { ${pascal} } from './index'`,
      '',
      `export interface ${pascal}Props {}`,
      '',
      `export interface ${pascal}Expose {}`,
      '',
      `export type ${pascal}Instance = ComponentPublicInstance<${pascal}, ${pascal}Props, ${pascal}Expose>`,
      '',
    ].join('\n')
    writeText(typesPath, content)
    return { changed: true, created: true }
  }

  const raw = readText(typesPath)
  const sourceJsdocMap = buildSourceJsdocMap(pkgDir)
  const interfaceNames = []
  for (const m of raw.matchAll(/export interface\s+([A-Za-z_]\w*)\s*\{/g)) {
    interfaceNames.push(m[1])
  }

  let next = raw
  let changed = false

  for (const name of interfaceNames) {
    const isTarget = name.endsWith('Props') || name.endsWith('Expose')
    if (!isTarget) continue
    const range = getInterfaceBlockRange(next, name)
    if (!range) continue

    const header = next.slice(range.start, range.braceStart + 1)
    const body = next.slice(range.braceStart + 1, range.end)
    const footer = '}'

    const newBody = normalizeInterfaceBody(name, body, sourceJsdocMap)
    const replacement = `${header}\n${newBody ? `${newBody}\n` : ''}${footer}`

    const before = next.slice(range.start, range.end + 1)
    if (before !== replacement) {
      next = `${next.slice(0, range.start)}${replacement}${next.slice(range.end + 1)}`
      changed = true
    }
  }

  if (changed) writeText(typesPath, next)
  return { changed, created: false }
}

function ensureNamedExportForIndexTs(pkgDir) {
  const indexPath = path.join(pkgDir, 'src', 'index.ts')
  if (!fs.existsSync(indexPath)) return { changed: false, skipped: true }

  const raw = readText(indexPath)
  const classMatch = raw.match(/class\s+([A-Za-z_]\w*)\s+extends\s+/)
  if (!classMatch) return { changed: false, skipped: true }

  const className = classMatch[1]
  const namedExport = new RegExp(`export\\s*\\{\\s*${className}\\s*\\}`)
  if (namedExport.test(raw)) return { changed: false, skipped: false }

  const defaultExportIdx = raw.lastIndexOf('export default')
  if (defaultExportIdx < 0) return { changed: false, skipped: true }

  const insertPos = defaultExportIdx
  const before = raw.slice(0, insertPos).trimEnd()
  const after = raw.slice(insertPos)
  const next = `${before}\n\nexport { ${className} }\n\n${after.trimStart()}`
  writeText(indexPath, `${next}\n`)
  return { changed: true, skipped: false }
}

function main() {
  const pkgs = listMiniprogramPackages()
  const stats = {
    total: pkgs.length,
    indexDtsChanged: 0,
    typesChanged: 0,
    indexNamedExportChanged: 0,
  }

  for (const pkg of pkgs) {
    const r1 = ensurePackageIndexDts(pkg.dir)
    if (r1.changed) stats.indexDtsChanged += 1

    const r2 = refactorTypesTs(pkg.dir)
    if (r2.changed) stats.typesChanged += 1

    const r3 = ensureNamedExportForIndexTs(pkg.dir)
    if (r3.changed) stats.indexNamedExportChanged += 1

    console.log(`✔ Component: ${pkg.name}`)
  }

  console.log(
    JSON.stringify(
      {
        ...stats,
      },
      null,
      2,
    ),
  )
}

main()

