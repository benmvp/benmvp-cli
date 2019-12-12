const { resolve } = require('path');

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  // parserOptions: {
  //   project: resolve(__dirname, 'tsconfig.json'),
  // },
  settings: {
    react: 'detect',
  },
  rules: {
    // overrides of eslint-config-airbnb
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      jsx: 'never',
    }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', {
      packageDir: [
        resolve(__dirname, '../../../../'),
        './',
      ],
    }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    semi: ['error', 'never'],


    // need to be turned off for rules in plugin:@typescript-eslint/recommended
    'no-undef': 'off',
    camelcase: 'off',

    // @typescript-eslint/eslint-plugin settings
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    }],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/consistent-type-assertions': ['error', {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter',
    }],

    // eslint-plugin-jest settings
    'jest/consistent-test-it': 'error',
    'jest/lowercase-name': 'error',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/valid-describe': 'error',
    'jest/valid-expect-in-promise': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
