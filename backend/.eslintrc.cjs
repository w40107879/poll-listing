module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'backend/tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        args: 'none',
      },
    ],
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'guard-for-in': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
