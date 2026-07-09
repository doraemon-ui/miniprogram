// lint-staged.config.js
const micromatch = require('micromatch')

module.exports = {
  '**/*.ts': (files) => {
    const match = micromatch.not(files, '**/shims-tsx.d.ts')
    return `eslint ${match.join(' ')} --fix`
  },

  '**/*.js': (files) => {
    const match = micromatch.not(files, ['**/eslint.config.js', '**/lint-staged.config.js'])
    return `eslint ${match.join(' ')} --fix`
  },

  '**/*.less': (files) => {
    return `stylelint ${files.join(' ')} --fix`
  },
}
