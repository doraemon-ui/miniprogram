const base = require('../../jest.config.base.js')
const path = require('path')

module.exports = {
  ...base,
  setupFiles: [...(base.setupFiles || []), path.join(__dirname, 'jest.setup.js')],
}
