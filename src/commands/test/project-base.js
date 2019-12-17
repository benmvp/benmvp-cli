const { resolve } = require('path')
const REAL_ROOT_DIR = process.cwd()

// NOTE: We really want `rootDir` to be the current working directory, but
// most of the runners will only look for their configurations where
// `rootDir` is defined. So we define it to be this directory so that it
// can find everything and then we specify `roots` & `testMatch` so that
// it can find the files in the host lib
module.exports = {
  rootDir: __dirname,
  roots: [REAL_ROOT_DIR],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|js)x?$': resolve(__dirname, './babel-jest-transform.js'),
  },
  testMatch: [resolve(REAL_ROOT_DIR, 'src/**/*.ts?(x)')],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
