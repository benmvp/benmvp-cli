const baseConfig = require('./project.base.js')

module.exports = {
  ...baseConfig,
  runner: 'jest-runner-tsc',
  displayName: 'typescript',
}
