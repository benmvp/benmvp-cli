const {resolve} = require('path');

module.exports = {
  extends: ['eventbrite', 'plugin:@typescript-eslint/recommended'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json'),
  },
  rules: {
    // overrides of eslint-config-eventbrite
    indent: ['error', 2, {SwitchCase: 1}],
    'prefer-const': 'error',
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', {asyncArrow: 'always'}],

    // need to be turned off for rules in plugin:@typescript-eslint/recommended
    'no-undef': 'off',
    camelcase: 'off',

    // @typescript-eslint/eslint-plugin settings
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
    '@typescript-eslint/indent': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
  },
}
