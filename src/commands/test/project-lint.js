const { resolve } = require('path')
const BASE_CONFIG = require('./project-base')

const [ROOT_DIR] = BASE_CONFIG.roots

module.exports = {
  ...BASE_CONFIG,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  watchPlugins: [...BASE_CONFIG.watchPlugins, 'jest-runner-eslint/watch-fix'],

  // we can lint both typescript and javascript files
  testMatch: [resolve(ROOT_DIR, 'src/**/*.{ts,js}?(x)')],
}
