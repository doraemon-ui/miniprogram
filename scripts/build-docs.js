#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const docsDir = path.join(repoRoot, 'docs')
const docsPlaygroundDir = path.join(docsDir, 'playground')
const packagesDir = path.join(repoRoot, 'packages')
const sidebarPath = path.join(docsDir, '_sidebar.md')

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile()
  } catch {
    return false
  }
}

function readText(p) {
  return fs.readFileSync(p, 'utf8')
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function listMiniprogramPackages() {
  if (!exists(packagesDir)) return []

  const entries = fs.readdirSync(packagesDir, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith('miniprogram.'))
    .map((e) => e.name)
    .filter((name) => name !== 'miniprogram.core-js')
}

function pkgNameToDocKey(pkgDirName) {
  return pkgDirName.replace(/^miniprogram\./, '')
}

function parseSidebarLinks(sidebarContent) {
  const lines = sidebarContent.split(/\r?\n/)

  let currentCategory = null
  const links = []

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]

    // category line: "- 基础组件"
    const categoryMatch = line.match(/^\s*-\s+([^[][^()]+)$/)
    if (categoryMatch) {
      const maybeCategory = categoryMatch[1].trim()
      // 排除类似 "- [介绍](introduce.md)" 的 link 行
      if (maybeCategory && !maybeCategory.includes('](')) {
        currentCategory = maybeCategory
      }
    }

    // link line: "- [Accordion 手风琴](accordion.md)"
    const linkMatch = line.match(/^\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*$/)
    if (!linkMatch) continue

    const text = linkMatch[1].trim()
    const href = linkMatch[2].trim()

    if (!href.endsWith('.md')) continue
    if (href.startsWith('_')) continue

    links.push({
      text,
      href,
      category: currentCategory,
      line: i + 1,
    })
  }

  return links
}

function writeIfChanged(destPath, content) {
  if (exists(destPath)) {
    const old = readText(destPath)
    if (old === content) return false
  }
  fs.writeFileSync(destPath, content, 'utf8')
  return true
}

function copyTextFileIfExists(srcPath, destPath) {
  if (!exists(srcPath)) return { ok: false, reason: 'missing' }
  ensureDir(path.dirname(destPath))
  const content = readText(srcPath)
  const changed = writeIfChanged(destPath, content)
  return { ok: true, changed }
}

function removeLegacyFlatExampleIfExists(key, ext) {
  // 兼容早期生成的扁平文件：docs/playground/<xx>_pages_index_index.<ext>
  const legacyPath = path.join(docsPlaygroundDir, `${key}_pages_index_index.${ext}`)
  if (isFile(legacyPath)) fs.unlinkSync(legacyPath)
}

function rewritePlaygroundExamplePaths(markdown, key) {
  // 将 packages README 中的示例 include 路径映射到 docs/playground 下的扁平文件
  // e.g. ./playground/pages/index/index.json -> ./playground/actionsheet/pages/index/index.json
  return markdown.replace(
    /(\.\/)?playground\/pages\/index\/index\.(json|wxml|js|wxss)\b/g,
    (_m, _maybeDotSlash, ext) => `./playground/${key}/pages/index/index.${ext}`,
  )
}

function main() {
  ensureDir(docsDir)
  ensureDir(docsPlaygroundDir)

  const pkgDirs = listMiniprogramPackages()
  const pkgDocMap = new Map()

  const warnings = []
  for (const pkgDirName of pkgDirs) {
    const key = pkgNameToDocKey(pkgDirName)
    const readmePath = path.join(packagesDir, pkgDirName, 'README.md')
    if (!exists(readmePath)) {
      warnings.push(`[skip] ${pkgDirName}: README.md 不存在`)
      continue
    }
    pkgDocMap.set(key, readmePath)
  }

  let sidebarLinks = []
  if (exists(sidebarPath)) {
    sidebarLinks = parseSidebarLinks(readText(sidebarPath))
  } else {
    warnings.push('[warn] docs/_sidebar.md 不存在，跳过 sidebar 校验')
  }

  let wroteCount = 0
  let skippedSameCount = 0
  let skippedMissingReadmeCount = 0
  let exampleCopiedCount = 0
  let exampleUnchangedCount = 0
  let exampleMissingCount = 0

  // 1) 复制 packages 下所有 miniprogram.xx 文档（除 core-js）
  for (const [key, readmePath] of pkgDocMap.entries()) {
    const destPath = path.join(docsDir, `${key}.md`)
    const pkgRootDir = path.dirname(readmePath)

    // 1.1) 复制每个组件的 playground 示例文件到 docs/playground 并改名
    // 要求：packages/miniprogram.xx/playground/pages/index/index.* -> docs/playground/xx/pages/index/index.*
    const exampleExts = ['json', 'wxml', 'js', 'wxss']
    for (const ext of exampleExts) {
      removeLegacyFlatExampleIfExists(key, ext)
      const src = path.join(pkgRootDir, 'playground', 'pages', 'index', `index.${ext}`)
      const dest = path.join(docsPlaygroundDir, key, 'pages', 'index', `index.${ext}`)
      const r = copyTextFileIfExists(src, dest)
      if (!r.ok) {
        exampleMissingCount += 1
        continue
      }
      if (r.changed) exampleCopiedCount += 1
      else exampleUnchangedCount += 1
    }

    // 1.2) 复制 README 到 docs，并将示例路径替换成 docs/playground 下的新路径
    const content = rewritePlaygroundExamplePaths(readText(readmePath), key)
    const changed = writeIfChanged(destPath, content)
    if (changed) wroteCount += 1
    else skippedSameCount += 1
  }

  skippedMissingReadmeCount = pkgDirs.length - pkgDocMap.size

  // 2) 参考 sidebar 做校验：sidebar 引用的 md 应该存在；若能映射到 package 则应有对应 README
  const missingInPackages = []
  const missingInDocs = []
  for (const link of sidebarLinks) {
    const docFile = link.href
    const key = docFile.replace(/\.md$/, '')
    const docPath = path.join(docsDir, docFile)

    if (!exists(docPath)) {
      missingInDocs.push(
        `${docFile} (line ${link.line}${link.category ? `, ${link.category}` : ''})`,
      )
    }

    // 只针对组件文档做 packages 映射提示：如果 packages 里没有同名 key，就提醒一下
    if (!pkgDocMap.has(key)) {
      // sidebar 顶部也有介绍/快速上手等页面，这些一般不在 packages 里，过滤掉
      const isTopDoc =
        link.category === null &&
        [
          'introduce.md',
          'quickstart.md',
          'customize-theme.md',
          'changelog.md',
          'utility.md',
          'controlled.md',
          'faq.md',
        ].includes(docFile)
      if (!isTopDoc) {
        missingInPackages.push(
          `${docFile} (line ${link.line}${link.category ? `, ${link.category}` : ''})`,
        )
      }
    }
  }

  // 输出结果
  const lines = []
  lines.push('[build-docs] done')
  lines.push(`- packages scanned: ${pkgDirs.length}`)
  lines.push(`- readme found: ${pkgDocMap.size}`)
  lines.push(`- docs written: ${wroteCount}`)
  lines.push(`- docs unchanged: ${skippedSameCount}`)
  lines.push(`- skipped (no README): ${skippedMissingReadmeCount}`)
  lines.push(`- examples copied: ${exampleCopiedCount}`)
  lines.push(`- examples unchanged: ${exampleUnchangedCount}`)
  lines.push(`- examples missing: ${exampleMissingCount}`)

  if (missingInDocs.length) {
    lines.push('')
    lines.push('[warn] sidebar 引用但 docs 缺失的文件：')
    for (const item of missingInDocs) lines.push(`- ${item}`)
  }

  if (missingInPackages.length) {
    lines.push('')
    lines.push('[info] sidebar 引用但 packages 中未找到同名组件 README（仅提示）：')
    for (const item of missingInPackages) lines.push(`- ${item}`)
  }

  if (warnings.length) {
    lines.push('')
    for (const w of warnings) lines.push(w)
  }

  // eslint-disable-next-line no-console
  console.log(lines.join('\n'))
}

main()
