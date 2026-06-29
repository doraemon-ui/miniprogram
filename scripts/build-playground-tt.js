const fs = require('fs/promises')
const path = require('path')

const ROOT_DIR = path.resolve(process.cwd(), 'playground/miniprogram/pages/node_modules/@doraemon-ui')

async function main() {
  const packages = await fs.readdir(ROOT_DIR, {
    withFileTypes: true,
  })

  for (const pkg of packages) {
    if (!pkg.isDirectory()) continue

    const distDir = path.join(ROOT_DIR, pkg.name, 'miniprogram_dist')

    try {
      const files = await fs.readdir(distDir)

      for (const file of files) {
        if (file.endsWith('.wxml')) {
          await fs.copyFile(path.join(distDir, file), path.join(distDir, file.replace(/\.wxml$/, '.ttml')))
        }

        if (file.endsWith('.wxss')) {
          await fs.copyFile(path.join(distDir, file), path.join(distDir, file.replace(/\.wxss$/, '.ttss')))
        }
      }

      console.log(`[done] ${pkg.name}`)
    } catch {
      // ignore
    }
  }

  console.log('[copy-tt] done')
}

main()
