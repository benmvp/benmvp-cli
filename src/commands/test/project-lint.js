const BASE_CONFIG = require('./project-base')

module.exports = {
  ...BASE_CONFIG,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  watchPlugins: [...BASE_CONFIG.watchPlugins, 'jest-runner-eslint/watch-fix'],
}
