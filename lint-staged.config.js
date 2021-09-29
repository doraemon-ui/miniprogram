const micromatch = require('micromatch')

module.exports = {
  '**/*.ts': (files) => {
    const match = micromatch.not(files, '*/**/shims-tsx.d.ts')
    return `eslint ${match.join(' ')} --ext ts --fix`
  },
  '**/*.js': (files) => {
    const match = micromatch.not(files, '*/**/.eslintrc.js')
    const more = micromatch.not(match, '*/**/lint-staged.config.js')
    return `eslint ${more.join(' ')} --ext js --fix`
  },
  '**/*.less': (files) => {
    return `stylelint ${files.join(' ')} --syntax less --fix`
  },
}
