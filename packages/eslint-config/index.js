module.exports = {
  extends: ['eslint:all', 'plugin:react/recommended', 'airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    APP_SETTINGS: true,
    alert: true,
    console: true,
    document: true,
    fetch: true,
    Promise: true,
    window: true,
  },
  rules: {
    // https://eslint.org/docs/rules/
    'arrow-body-style': 0,
    'no-console': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'valid-typeof': 0,

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/extensions': 0,
    'import/no-unresolved': 0,

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/forbid-prop-types': 0,

    // -----------------------

    // https://eslint.org/docs/rules/
    'no-param-reassign': 1,
    'no-unreachable': 1,
    'no-unused-expressions': 1,
    'no-unused-vars': 1,
    'prefer-promise-reject-errors': 1,

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/prefer-default-export': 1,

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/label-has-associated-control': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 1,

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/destructuring-assignment': 1,
    'react/prefer-stateless-function': 1,
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          '/^on.+$/',
          'rendering',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
  },
};
