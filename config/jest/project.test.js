const baseConfig = require('./project.base.js')

module.exports = {
  ...baseConfig,
  displayName: 'test',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
}
