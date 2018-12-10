const {resolve} = require('path')
const BASE_CONFIG = require('./project-base')

const [ROOT_DIR] = BASE_CONFIG.roots

module.exports = {
  ...BASE_CONFIG,
  displayName: 'unit',
  testMatch: [resolve(ROOT_DIR, 'src/**/*.spec.ts')],
}
