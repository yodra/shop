module.exports = {
  env: {
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': 'error',
    curly: [
      2,
      'all'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-multi-spaces': 'error',
    'comma-dangle': 'error',
    'no-var': 'error',
    'no-extra-semi': 'error',
    'key-spacing': [
      'error',
      {
        'beforeColon': false
      }
    ],
    'no-spaced-func': 'error',
    'space-infix-ops': [
      'error',
      {
        'int32Hint': false
      }
    ],
    quotes: [
      'error',
      'single',
      {
        'avoidEscape': true
      }
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error'
    ],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'array-bracket-spacing': ['error', 'never'],
    'keyword-spacing': ['error'],
    indent: ['error', 2, {
      SwitchCase: 1,
      ignoredNodes: [
        'JSXAttribute'
      ],
      MemberExpression: 1
    }]
  }
};
