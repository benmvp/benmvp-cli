const {resolve} = require('path')

module.exports = {
  cliOptions: {
    config: resolve(__dirname, 'eslint.config.js'),
    cache: true,
  },
}
