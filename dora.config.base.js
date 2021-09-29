module.exports = {
  entry: ['./src/**/*.ts'],
  outputDir: './miniprogram_dist',
  copyPlugin: {
    entry: [
      './src/**/*.json',
      './src/**/*.wxml',
      './src/**/*.wxss',
      '!./src/**/*.ts',
    ],
  },
  cssPlugin: {
    entry: [
      './src/**/*.less',
    ],
    pxTransform: {
      designWidth: 375,
    },
  },
}