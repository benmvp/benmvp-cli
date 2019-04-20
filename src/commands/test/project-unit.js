const {resolve} = require('path')
const BASE_CONFIG = require('./project-base')

const [ROOT_DIR] = BASE_CONFIG.roots

module.exports = {
  ...BASE_CONFIG,
  displayName: 'unit',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  // test files end in *.spec.ts. The base `testMatch`
  // is just looking at *.ts
  testMatch: [resolve(ROOT_DIR, 'src/**/*.spec.ts')],

  // TODO: Use setupTestFrameworkScriptFile to ensure an expect runs for each test
  // Possibly also prevent console.error / console.warn
}
