const simulate = require('miniprogram-simulate')
const SimulatePatch = require('./patches/miniprogram-simulate-patch')

// 应用补丁
const patch = new SimulatePatch(simulate)
patch.apply()

// 保存 patch 实例到全局，方便单独控制
global.simulatePatch = patch

// // 每个测试前清理缓存（可选）
// beforeEach(() => {
//   // 如果需要每个测试完全隔离，取消下面的注释
//   // global.simulatePatch.clearCache()
// })

// // 所有测试完成后恢复原始方法
// afterAll(() => {
//   global.simulatePatch.restore()
// })
