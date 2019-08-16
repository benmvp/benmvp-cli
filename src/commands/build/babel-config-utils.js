/**
 * Generates a babel configuration for the specified module type
 * @param {'cjs' | 'esm'} moduleType The module type for which to generate a config
 */
const getBabelConfig = (moduleType) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions',
        modules: moduleType === 'esm' ? false : moduleType,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-transform-runtime', {
      corejs: false,
      helpers: false,
      regenerator: true,

      // NOTE: May need to point this to a specific one, see
      // https://github.com/facebook/create-react-app/blob/695ca7576a6d27912bcf9d992b00ef7316232555/packages/babel-preset-react-app/create.js#L181
      absoluteRuntime: false,
    }]
  ],
})

module.exports = {getBabelConfig}
