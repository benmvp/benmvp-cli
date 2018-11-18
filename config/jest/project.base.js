module.exports = {
  rootDir: '../../',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.ts'],
}
