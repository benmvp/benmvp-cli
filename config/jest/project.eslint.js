const baseConfig = require('./project.base.js')

module.exports = {
  ...baseConfig,
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
}
