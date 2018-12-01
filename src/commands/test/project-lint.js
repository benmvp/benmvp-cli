const BASE_CONFIG = require('./project-base')

module.exports = {
  ...BASE_CONFIG,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
}
