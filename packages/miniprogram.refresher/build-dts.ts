import { buildDts, getDtsConfig } from '@doraemon-ui/miniprogram.tools'

const indexConfig = getDtsConfig({
  entry: 'temp/index.d.ts',
  outputFile: 'index.d.ts',
  tsconfig: 'tsconfig.dts.json',
})

async function buildAll() {
  await buildDts(indexConfig)
}

buildAll()
