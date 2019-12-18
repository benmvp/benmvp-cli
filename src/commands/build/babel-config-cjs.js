const { getBabelConfig } = require('./babel-config-utils')

module.exports = (api) => {
  api.cache.forever()

  return getBabelConfig('cjs')
}
