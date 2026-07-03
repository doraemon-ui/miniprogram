import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ICON_TYPE_START = '// AUTO-GENERATED-ICON-TYPE-START'
const ICON_TYPE_END = '// AUTO-GENERATED-ICON-TYPE-END'
const MP_ICON_TYPE_START = '// AUTO-GENERATED-MP-ICON-TYPE-START'
const MP_ICON_TYPE_END = '// AUTO-GENERATED-MP-ICON-TYPE-END'

const packageRoot = process.cwd()
const doraIconfontCssPath = path.join(packageRoot, 'iconfont/doraemon-ui-icons/iconfont.css')
const mpIconfontCssPath = path.join(packageRoot, 'iconfont/miniprogram-icons/iconfont.css')
const typesFilePath = path.join(packageRoot, 'src/types.ts')
const playgroundIconsFilePath = path.join(packageRoot, 'playground/pages/index/icons.js')

function extractIconNames(source: string, prefix: string, sourcePath: string) {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const matches = source.matchAll(new RegExp(`\\.${escapedPrefix}([a-z0-9_-]+)::?before`, 'gi'))
  const iconNames = [...new Set(Array.from(matches, (match) => match[1]))].sort((a, b) => a.localeCompare(b))

  if (iconNames.length === 0) {
    throw new Error(`No icon names found in ${sourcePath}`)
  }

  return iconNames
}

function createTypeBlock(options: {
  blockStart: string
  blockEnd: string
  typeName: string
  sourcePath: string
  iconNames: string[]
}) {
  const { blockStart, blockEnd, typeName, sourcePath, iconNames } = options
  const union = iconNames.map((iconName) => `  | '${iconName}'`).join('\n')

  return [
    blockStart,
    '/**',
    ` * 基于 ${path.relative(packageRoot, sourcePath)} 自动生成，请勿手动编辑。`,
    ' */',
    `export type ${typeName} =`,
    union,
    blockEnd,
  ].join('\n')
}

function createIconArraySource(exportName: string, iconNames: string[]) {
  const icons = iconNames.map((iconName) => `  '${iconName}',`).join('\n')

  return [`export const ${exportName} = [`, icons, ']', ''].join('\n')
}

function createPlaygroundIconsSource(doraIconNames: string[], mpIconNames: string[]) {
  return [
    createIconArraySource('doraicons', doraIconNames),
    createIconArraySource('mpicons', mpIconNames),
    'export const icons = [',
    '  {',
    "    fontFamily: 'doraicons',",
    '    icons: doraicons,',
    '  },',
    '  {',
    "    fontFamily: 'mpicons',",
    '    icons: mpicons,',
    '  },',
    ']',
    '',
  ].join('\n')
}

async function buildIconArtifacts() {
  const [doraIconfontCssSource, mpIconfontCssSource, typesSource] = await Promise.all([
    readFile(doraIconfontCssPath, 'utf8'),
    readFile(mpIconfontCssPath, 'utf8'),
    readFile(typesFilePath, 'utf8'),
  ])

  const iconNames = extractIconNames(doraIconfontCssSource, 'doraicons-', doraIconfontCssPath)
  const mpIconNames = extractIconNames(mpIconfontCssSource, 'mpicons-', mpIconfontCssPath)
  const nextIconTypeBlock = createTypeBlock({
    blockStart: ICON_TYPE_START,
    blockEnd: ICON_TYPE_END,
    typeName: 'IconType',
    sourcePath: doraIconfontCssPath,
    iconNames,
  })
  const nextMpIconTypeBlock = createTypeBlock({
    blockStart: MP_ICON_TYPE_START,
    blockEnd: MP_ICON_TYPE_END,
    typeName: 'MpIconType',
    sourcePath: mpIconfontCssPath,
    iconNames: mpIconNames,
  })
  const nextPlaygroundIconsSource = createPlaygroundIconsSource(iconNames, mpIconNames)

  const iconTypePattern = new RegExp(`${ICON_TYPE_START}[\\s\\S]*?${ICON_TYPE_END}`)
  const mpIconTypePattern = new RegExp(`${MP_ICON_TYPE_START}[\\s\\S]*?${MP_ICON_TYPE_END}`)

  if (!iconTypePattern.test(typesSource) || !mpIconTypePattern.test(typesSource)) {
    throw new Error(`Missing icon type markers in ${typesFilePath}`)
  }

  const nextTypesSource = typesSource
    .replace(iconTypePattern, nextIconTypeBlock)
    .replace(mpIconTypePattern, nextMpIconTypeBlock)

  if (nextTypesSource !== typesSource) {
    await writeFile(typesFilePath, nextTypesSource)
  }

  await writeFile(playgroundIconsFilePath, nextPlaygroundIconsSource)

  console.log(
    `Generated IconType (${iconNames.length}), MpIconType (${mpIconNames.length}) and playground icons`,
  )
}

buildIconArtifacts().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
