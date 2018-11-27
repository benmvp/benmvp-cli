const {resolve} = require('path')

const ROOT_DIR = process.cwd()

const BASE_CONFIG = {
  rootDir: ROOT_DIR,
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.ts'],
}

module.exports = {
  rootDir: ROOT_DIR,
  projects: [
    {
      ...BASE_CONFIG,
      displayName: 'test',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
    },
    // {
    //   ...BASE_CONFIG,
    //   runner: 'jest-runner-eslint',
    //   displayName: 'eslint',
    // },
    {
      ...BASE_CONFIG,
      runner: 'jest-runner-tsc',
      displayName: 'typescript',
    },
  ],
}
