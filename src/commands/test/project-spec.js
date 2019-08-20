const {resolve} = require('path')
const BASE_CONFIG = require('./project-base')

const [ROOT_DIR] = BASE_CONFIG.roots

module.exports = {
  ...BASE_CONFIG,
  displayName: 'spec',

  // test files end in *.spec.ts. The base `testMatch`
  // is just looking at *.ts
  testMatch: [resolve(ROOT_DIR, 'src/**/*.spec.ts')],

  setupFilesAfterEnv: [resolve(__dirname, 'spec-setup.js')],
  testEnvironment: 'enzyme',
}
