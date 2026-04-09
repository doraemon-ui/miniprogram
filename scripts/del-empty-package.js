// #!/usr/bin/env node

// const fs = require('fs')
// const path = require('path')

// // 获取当前工作目录（应该是miniprogram）
// const currentDir = process.cwd()
// console.log('当前工作目录:', currentDir)

// // 基础路径 - 使用当前目录下的packages
// const basePath = path.join(currentDir, 'packages')
// console.log('扫描路径:', basePath)

// // 检查目录是否为空
// function isDirEmpty(dirPath) {
//   try {
//     const files = fs.readdirSync(dirPath)
//     // 过滤掉常见的系统文件
//     const filteredFiles = files.filter((file) => !file.startsWith('.') && file !== 'node_modules' && file !== 'README.md')
//     return filteredFiles.length === 0
//   } catch (error) {
//     // 目录不存在或其他错误
//     return false
//   }
// }

// // 主函数
// function main() {
//   console.log('开始扫描 packages 目录...')

//   // 检查 packages 目录是否存在
//   if (!fs.existsSync(basePath)) {
//     console.error(`错误：${basePath} 目录不存在！`)
//     console.log('请确保你在项目根目录（miniprogram/）下运行此脚本')
//     process.exit(1)
//   }

//   // 获取所有 miniprogram.xx 目录
//   const items = fs.readdirSync(basePath)
//   const targetDirs = items.filter((item) => item.startsWith('miniprogram.') && fs.statSync(path.join(basePath, item)).isDirectory())

//   if (targetDirs.length === 0) {
//     console.log('没有找到符合条件的 miniprogram.xx 目录')
//     return
//   }

//   console.log(`找到 ${targetDirs.length} 个目标目录`)

//   let deletedCount = 0

//   // 遍历每个目录
//   targetDirs.forEach((dirName) => {
//     const dirPath = path.join(basePath, dirName)
//     const srcPath = path.join(dirPath, 'src')

//     console.log(`\n检查: ${dirName}`)

//     // 检查 src 目录是否存在且为空
//     if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
//       if (isDirEmpty(srcPath)) {
//         try {
//           // 删除整个目录
//           fs.rmSync(dirPath, { recursive: true, force: true })
//           console.log(`✅ 已删除: ${dirName} (src目录为空)`)
//           deletedCount++
//         } catch (error) {
//           console.error(`❌ 删除失败 ${dirName}: ${error.message}`)
//         }
//       } else {
//         console.log(`⏭️  跳过: ${dirName} (src目录不为空)`)
//       }
//     } else {
//       // 如果没有 src 目录，检查整个目录是否为空
//       if (isDirEmpty(dirPath)) {
//         try {
//           fs.rmSync(dirPath, { recursive: true, force: true })
//           console.log(`✅ 已删除: ${dirName} (目录为空)`)
//           deletedCount++
//         } catch (error) {
//           console.error(`❌ 删除失败 ${dirName}: ${error.message}`)
//         }
//       } else {
//         console.log(`⏭️  跳过: ${dirName} (没有src目录且目录不为空)`)
//       }
//     }
//   })

//   console.log(`\n📊 统计：共处理 ${targetDirs.length} 个目录，删除了 ${deletedCount} 个目录`)

//   if (deletedCount > 0) {
//     console.log('\n✨ 清理完成！')
//   }
// }

// // 运行主函数
// main()

// #!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 当前工作目录
const currentDir = process.cwd()
console.log('当前工作目录:', currentDir)

// packages 路径
const basePath = path.join(currentDir, 'packages')
console.log('扫描路径:', basePath)

function main() {
  console.log('开始扫描 packages 目录...')

  if (!fs.existsSync(basePath)) {
    console.error(`错误：${basePath} 目录不存在！`)
    process.exit(1)
  }

  const items = fs.readdirSync(basePath)

  // 找到所有 miniprogram.xx 目录
  const targetDirs = items.filter((item) => {
    const fullPath = path.join(basePath, item)
    return item.startsWith('miniprogram.') && fs.statSync(fullPath).isDirectory()
  })

  if (targetDirs.length === 0) {
    console.log('没有找到符合条件的 miniprogram.xx 目录')
    return
  }

  console.log(`找到 ${targetDirs.length} 个组件目录`)

  let deletedCount = 0

  targetDirs.forEach((dirName) => {
    const typesPath = path.join(basePath, dirName, 'src', 'types.ts')

    console.log(`\n检查: ${dirName}`)

    if (fs.existsSync(typesPath)) {
      try {
        fs.unlinkSync(typesPath)
        console.log(`✅ 已删除: ${dirName}/src/types.ts`)
        deletedCount++
      } catch (error) {
        console.error(`❌ 删除失败 ${dirName}: ${error.message}`)
      }
    } else {
      console.log(`⏭️  跳过: ${dirName} (没有 types.ts)`)
    }
  })

  console.log(`\n📊 统计：扫描 ${targetDirs.length} 个组件，删除 ${deletedCount} 个 types.ts`)

  if (deletedCount > 0) {
    console.log('\n✨ 清理完成！')
  }
}

main()
