const fs = require('fs')
const path = require('path')
const glob = require('glob')

const ROOT_DIR = path.resolve(__dirname, '..')
const DEFAULT_DIRECTORIES = ['packages', 'packages-core', 'demos']
const DEFAULT_VERSION = '0.0.2-alpha.46'

function parseArgs(argv) {
  const args = {
    directories: DEFAULT_DIRECTORIES,
    version: DEFAULT_VERSION,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--dirs' || arg === '--directories') {
      const value = argv[index + 1]
      if (!value) {
        throw new Error('Missing value for --dirs')
      }
      args.directories = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      index += 1
      continue
    }

    if (arg === '--version') {
      const value = argv[index + 1]
      if (!value) {
        throw new Error('Missing value for --version')
      }
      args.version = value.trim()
      index += 1
      continue
    }
  }

  return args
}

function resolvePackageFiles(directories) {
  return [
    ...new Set(
      directories.flatMap((directory) => {
        const directoryPath = path.resolve(ROOT_DIR, directory)
        return glob.sync(`${directoryPath}/*/package.json`, {
          ignore: '**/node_modules/**',
        })
      }),
    ),
  ]
}

function updatePackageVersion(file, version) {
  const content = fs.readFileSync(file, 'utf-8')
  const pkg = JSON.parse(content)

  if (!pkg.name || pkg.version === undefined || pkg.version === version) {
    return false
  }

  pkg.version = version
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n')
  return true
}

function main() {
  const { directories, version } = parseArgs(process.argv.slice(2))
  const files = resolvePackageFiles(directories)
  let updated = 0

  files.forEach((file) => {
    if (updatePackageVersion(file, version)) {
      console.log(`✓ ${path.relative(ROOT_DIR, file)}`)
      updated += 1
    }
  })

  console.log(`\nDone. Updated ${updated} package(s) to ${version}.`)
}

main()
