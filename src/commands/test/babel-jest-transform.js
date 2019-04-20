const {resolve} = require('path')
const babelJest = require('babel-jest')

// Special augmented babel-jest where we point to a specific
// babel-config.js instead of it doing its normal walk up the
// tree resolution algorithm since the config file cannot be
// in source.
module.exports = babelJest.createTransformer({
  presets: [resolve(__dirname, '../build/babel-config-cjs.js')],
  babelrc: false,
  configFile: false,
})
