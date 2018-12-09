const {resolve} = require('path')
const BASE_CONFIG = require('./project-base')

// NOTE: We really want `rootDir to be the one coming from base, but
// `jest-runner-eslint` will only look for `jest-runner-eslint.config.js`
// where `rootDir` is defined. So we override it for linting to be this
// directory so that it can find everything and then we override
// `roots` & `testMatch` so that it can find the files in the host lib
module.exports = {
  ...BASE_CONFIG,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  rootDir: __dirname,
  roots: [BASE_CONFIG.rootDir],
  testMatch: [resolve(BASE_CONFIG.rootDir, 'src/**/*.ts')],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
}
