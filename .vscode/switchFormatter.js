// .vscode/switchFormatter.js
const fs = require('fs')
const path = require('path')

const settingsFile = path.resolve(__dirname, 'settings.json')

const mode = process.argv[2]

const map = {
  eslint: {
    formatter: 'dbaeumer.vscode-eslint',
    fixAll: 'always',
  },
  prettier: {
    formatter: 'esbenp.prettier-vscode',
    fixAll: 'never',
  },
}

if (!map[mode]) {
  console.log('[VSCode] Usage: node .vscode/switchFormatter.js eslint|prettier')
  process.exit(1)
}

const { formatter, fixAll } = map[mode]

let content = fs.readFileSync(settingsFile, 'utf8')

// root editor.defaultFormatter
content = content.replace(
  /"editor\.defaultFormatter"\s*:\s*"[^"]*"/,
  `"editor.defaultFormatter": "${formatter}"`,
)

// language overrides
for (const key of [
  '\\[javascript\\]',
  '\\[javascriptreact\\]',
  '\\[typescript\\]',
  '\\[typescriptreact\\]',
]) {
  content = content.replace(
    new RegExp(`("${key}"\\s*:\\s*\\{[^}]*?"editor\\.defaultFormatter"\\s*:\\s*)"[^"]*"`, 's'),
    `$1"${formatter}"`,
  )
}

// source.fixAll.eslint
content = content.replace(
  /"source\.fixAll\.eslint"\s*:\s*"[^"]*"/,
  `"source.fixAll.eslint": "${fixAll}"`,
)

fs.writeFileSync(settingsFile, content)

console.log(`[VSCode] Switching formatter → ${mode}`)
console.log(`[VSCode] Formatter: ${formatter}`)
console.log(`[VSCode] ESLint fix: ${fixAll}`)
console.log('[VSCode] settings.json updated')