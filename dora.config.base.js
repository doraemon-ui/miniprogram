module.exports = {
  entry: ['./src/**/*.ts', '!./src/**/*.d.ts', '!./src/**/types.ts'],
  outputDir: './miniprogram_dist',
  copyPlugin: {
    entry: ['./src/**/*.json', './src/**/*.wxml', './src/**/*.wxss', '!./src/**/*.ts'],
  },
  cssPlugin: {
    entry: ['./src/**/*.less'],
    pxTransform: {
      designWidth: 375,
    },
  },
}
