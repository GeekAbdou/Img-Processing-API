module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    extends: 'standard',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': 0,
    'no-var': 'error',
    'prefer-const': 'error',
    'indent': ['error', 2],
    'quote-props': 'always',
  },
}
