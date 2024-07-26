module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'frontend/tsconfig.json',
  },
  plugins: ['react', 'react-hooks', 'react-refresh', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['public/**/*.js', '*.config.*', 'vite.*.ts'],
  rules: {
    'react-refresh/only-export-components': 'warn',

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
    'import/extensions': 'off',

    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'react/require-default-props': 0,

    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,

    '@typescript-eslint/no-unused-vars': [
      2,
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
};
