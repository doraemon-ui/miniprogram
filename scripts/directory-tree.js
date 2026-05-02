const fs = require('fs')
const path = require('path')

/**
 * 生成目录结构的Markdown格式文本
 * @param {string} directory - 要扫描的目录路径
 * @param {string} prefix - 当前行前缀（用于递归缩进）
 * @param {string[]} outputLines - 输出行数组（用于递归累加）
 * @param {Object} options - 配置选项
 * @param {number} currentDepth - 当前递归深度
 * @returns {string[]} 输出行数组
 */
function generateMarkdownTree(directory, prefix = '', outputLines = null, options = {}, currentDepth = 0) {
  if (outputLines === null) {
    outputLines = []
  }

  const { ignoreHidden = true, maxDepth = null } = options

  // 检查深度限制
  if (maxDepth !== null && currentDepth > maxDepth) {
    return outputLines
  }

  try {
    // 读取目录内容
    let items = fs.readdirSync(directory)

    // 获取每个项目的完整路径和类型
    items = items.map((item) => {
      const itemPath = path.join(directory, item)
      const stats = fs.statSync(itemPath)
      return {
        name: item,
        path: itemPath,
        isDirectory: stats.isDirectory(),
      }
    })

    // 排序：目录在前，文件在后，然后按名称排序
    items.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) {
        return a.isDirectory ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })

    // 过滤隐藏文件
    if (ignoreHidden) {
      items = items.filter((item) => !item.name.startsWith('.'))
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const isLast = i === items.length - 1
      const connector = isLast ? '└── ' : '├── '

      if (item.isDirectory) {
        // 处理目录
        outputLines.push(`${prefix}${connector}**${item.name}/**`)

        // 递归处理子目录
        const extension = isLast ? '    ' : '│   '
        generateMarkdownTree(item.path, prefix + extension, outputLines, options, currentDepth + 1)
      } else {
        // 处理文件
        outputLines.push(`${prefix}${connector}${item.name}`)
      }
    }
  } catch (error) {
    if (error.code === 'EACCES') {
      outputLines.push(`${prefix}- **权限不足，无法读取:** ${path.basename(directory)}`)
    } else {
      throw error
    }
  }

  return outputLines
}

/**
 * 将目录结构保存为Markdown文件
 * @param {string} directory - 要扫描的目录路径
 * @param {string} outputFile - 输出Markdown文件路径
 * @param {Object} options - 配置选项
 */
function saveToMarkdown(directory, outputFile, options = {}) {
  const { ignoreHidden = true, maxDepth = null, title = null, includeHeader = true } = options

  // 检查目录是否存在
  if (!fs.existsSync(directory)) {
    throw new Error(`目录不存在: ${directory}`)
  }

  const stats = fs.statSync(directory)
  if (!stats.isDirectory()) {
    throw new Error(`路径不是目录: ${directory}`)
  }

  // 生成目录树
  const treeLines = generateMarkdownTree(directory, '', null, { ignoreHidden, maxDepth })

  // 准备Markdown内容
  let markdownContent = ''

  if (includeHeader) {
    // 添加标题
    const headerTitle = title || path.basename(directory)
    markdownContent += `# 📁 目录结构: ${headerTitle}\n\n`
    markdownContent += `生成时间: ${new Date().toLocaleString()}\n\n`
    markdownContent += `根目录: \`${path.resolve(directory)}\`\n\n`

    // 添加配置信息
    const configInfo = []
    if (ignoreHidden) configInfo.push('忽略隐藏文件')
    if (maxDepth !== null) configInfo.push(`最大深度: ${maxDepth}`)
    if (configInfo.length > 0) {
      markdownContent += `配置: ${configInfo.join(', ')}\n\n`
    }

    markdownContent += '---\n\n'
  }

  // 添加目录树
  markdownContent += '```\n'
  markdownContent += treeLines.join('\n')
  markdownContent += '\n```\n'

  // 写入文件
  fs.writeFileSync(outputFile, markdownContent, 'utf8')
  console.log(`✅ 目录结构已保存到: ${outputFile}`)
}

/**
 * 命令行接口
 */
function cli() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
使用方法: node directory-tree-to-markdown.js <目录路径> [选项]

选项:
  -o, --output <文件>     输出Markdown文件路径 (默认: directory_tree.md)
  -d, --max-depth <数字>  最大递归深度
  --no-ignore-hidden      包含隐藏文件/文件夹 (默认: 忽略)
  -t, --title <标题>      自定义Markdown标题
  --no-header             不包含头部信息
  -h, --help              显示帮助信息

示例:
  node directory-tree-to-markdown.js ./my-project
  node directory-tree-to-markdown.js ./my-project -o structure.md
  node directory-tree-to-markdown.js ./my-project -d 3
  node directory-tree-to-markdown.js ./my-project --no-ignore-hidden
        `)
    return
  }

  const directory = args[0]
  let outputFile = 'directory_tree.md'
  let maxDepth = null
  let ignoreHidden = true
  let title = null
  let includeHeader = true

  // 解析命令行参数
  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '-o':
      case '--output':
        outputFile = args[++i]
        break
      case '-d':
      case '--max-depth':
        maxDepth = parseInt(args[++i], 10)
        break
      case '--no-ignore-hidden':
        ignoreHidden = false
        break
      case '-t':
      case '--title':
        title = args[++i]
        break
      case '--no-header':
        includeHeader = false
        break
    }
  }

  try {
    saveToMarkdown(directory, outputFile, {
      ignoreHidden,
      maxDepth,
      title,
      includeHeader,
    })
  } catch (error) {
    console.error(`❌ 错误: ${error.message}`)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  cli()
}

// 导出函数供其他模块使用
module.exports = {
  generateMarkdownTree,
  saveToMarkdown,
}
