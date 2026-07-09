import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const packageRoot = process.cwd()

const iconfontCssPaths = [
  path.join(packageRoot, 'iconfont/doraemon-ui-icons/iconfont.css'),
  path.join(packageRoot, 'iconfont/miniprogram-icons/iconfont.css'),
]
const outputLessPath = path.join(packageRoot, 'assets/index.less')

type IconRule = {
  name: string
  rule: string
}

type FontAsset = {
  cssPath: string
  sourceFontFamily: string
  fontFamilyLine: string
  src: string
  iconRules: IconRule[]
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractFontFamilyLine(cssSource: string) {
  const match = cssSource.match(/^(\s*font-family:\s*)(['"])([^'"]+)(\2\s*;[^\n]*)$/m)

  if (!match) {
    throw new Error('No font-family declaration found in iconfont css')
  }

  return {
    sourceFontFamily: match[3],
    targetLine: `${match[1]}${match[2]}${match[3]}${match[4]}`.trim(),
  }
}

function extractFontSrc(cssSource: string, cssPath: string) {
  const match = cssSource.match(/url\((['"])data:[\s\S]*?\1\)\s*format\((['"])woff2\2\)/i)

  if (!match) {
    throw new Error(`No base64 woff2 src found in ${cssPath}`)
  }

  return match[0]
}

function extractIconRules(cssSource: string, sourceFontFamily: string, cssPath: string) {
  const selectorPattern = new RegExp(`\\.${escapeRegExp(sourceFontFamily)}-([a-z0-9_-]+)::?before\\s*\\{[\\s\\S]*?\\}`, 'gi')

  const rules = Array.from(cssSource.matchAll(selectorPattern), (match) => ({
    name: match[1],
    rule: match[0]
      .replace(/:before/g, '::before')
      .replace(/\r\n/g, '\n')
      .trim(),
  })).sort((a, b) => a.name.localeCompare(b.name))

  if (rules.length === 0) {
    throw new Error(`No icon rules found in ${cssPath}`)
  }

  return rules
}

function createBaseClassBlock(sourceFontFamily: string) {
  return [
    `.${sourceFontFamily} {`,
    `  font-family: "${sourceFontFamily}" !important;`,
    '  font-style: normal;',
    '  font-weight: 400;',
    '  font-variant: normal;',
    '  line-height: 1;',
    '  text-transform: none;',
    '  text-rendering: auto;',
    '  speak: none;',
    '  -webkit-font-smoothing: antialiased;',
    '  -moz-osx-font-smoothing: grayscale;',
    '}',
    '',
  ]
}

async function readFontAsset(cssPath: string) {
  const cssSource = await readFile(cssPath, 'utf8')
  const { sourceFontFamily, targetLine } = extractFontFamilyLine(cssSource)

  return {
    cssPath,
    sourceFontFamily,
    fontFamilyLine: targetLine,
    src: extractFontSrc(cssSource, cssPath),
    iconRules: extractIconRules(cssSource, sourceFontFamily, cssPath),
  } satisfies FontAsset
}

async function buildLess() {
  const fontAssets = await Promise.all(iconfontCssPaths.map((cssPath) => readFontAsset(cssPath)))

  const iconCount = fontAssets.reduce((total, asset) => total + asset.iconRules.length, 0)

  const lessSource = [
    "@import './variables.less';",
    '',
    '// Icon styles',
    '// -----------------------------',
    ...fontAssets.flatMap((asset) => [
      '@font-face {',
      `  ${asset.fontFamilyLine}`,
      '  font-style: normal;',
      '  font-weight: 400;',
      `  src: ${asset.src};`,
      '}',
      '',
      ...createBaseClassBlock(asset.sourceFontFamily),
      ...asset.iconRules.map((item) => item.rule),
      '',
    ]),
    '',
  ].join('\n')

  await writeFile(outputLessPath, lessSource)

  console.log(`Generated ${path.relative(packageRoot, outputLessPath)} with ${iconCount} icons from ${fontAssets.length} iconfont sources`)
}

buildLess().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
