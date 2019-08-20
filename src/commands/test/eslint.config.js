const {resolve} = require('path');

module.exports = {
  extends: ['eventbrite-react', 'plugin:@typescript-eslint/recommended'],
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
  settings: {
    react: 'detect',
  },
  rules: {
    // overrides of eslint-config-eventbrite
    indent: ['error', 2, {SwitchCase: 1}],
    'react/jsx-indent': ['error', 2],
    'prefer-const': 'error',
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', {asyncArrow: 'always'}],

    // overrides of eslint-config-eventbrite-react
    'react/jsx-no-bind': 'off',


    // need to be turned off for rules in plugin:@typescript-eslint/recommended
    'no-undef': 'off',
    camelcase: 'off',

    // @typescript-eslint/eslint-plugin settings
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      // allowHigherOrderFunctions: true,
    }],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': ['error', {allowAsParameter: true}],


  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
}
