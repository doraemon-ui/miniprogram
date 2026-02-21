import { startBuild, getRollupConfig } from '@doraemon-ui/miniprogram.tools'

const indexConfig = getRollupConfig({
  entry: 'src/index.ts',
  outputFile: 'miniprogram_dist/index.js',
  format: 'esm',
  env: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
})

async function buildAll() {
  indexConfig.inputOptions.external = [/@doraemon-ui/, '@tarojs/react', '@tarojs/taro', '@tarojs/components', 'react']
  await startBuild(indexConfig)
}

buildAll()
