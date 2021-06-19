module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error'
    ],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'array-bracket-spacing': ['error', 'never'],
    'keyword-spacing': ['error'],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'ignoredNodes': [
        'JSXAttribute'
      ],
      'MemberExpression': 1
    }],
    'curly': ['error', 'all']
  }
};
