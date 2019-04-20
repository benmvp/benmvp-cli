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
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-object-rest-spread',
  ],
})

module.exports = {getBabelConfig}
