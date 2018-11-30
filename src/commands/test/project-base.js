module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.ts'],
}
