const BASE_CONFIG = require('./project-base')

module.exports = {
  ...BASE_CONFIG,
  displayName: 'unit',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
}
