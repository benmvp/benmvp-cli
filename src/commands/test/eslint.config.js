module.exports = {
  extends: 'eventbrite',
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  parser: 'typescript-eslint-parser',
  plugins: ['typescript'],
  rules: {
    // overrides of eslint-config-eventbrite
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'prefer-const': 'error',
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', {asyncArrow: 'always'}],

    // need to be turned off for eslint-plugin-typescript below
    'no-undef': 'off',
    camelcase: 'off',

    // eslint-plugin-typescript settings
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/class-name-casing': 'error',
    'typescript/interface-name-prefix': 'error',
    'typescript/member-delimiter-style': ['error', {delimiter: 'none'}],
    'typescript/no-unused-vars': 'error',
    'typescript/member-ordering': 'error',
    'typescript/no-angle-bracket-type-assertion': 'error',
    'typescript/no-array-constructor': 'error',
    'typescript/no-empty-interface': 'error',
    'typescript/no-use-before-define': 'error',
    'typescript/type-annotation-spacing': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
  },
}
