const ERROR = 2;
const OFF = 0;
const WARN = 1;

module.exports = {
  ignorePatterns: [
    '.eslintrc.*',
    'playwright.config.ts',
    'vite.config.*',
    'dist/**/*',
    'build/**/*',
    '**/*.d.ts',
    '**/*.spec.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  globals: {
    JSX: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    complexity: [ERROR, 5],
    'max-params': [ERROR, 4],
    'max-statements': [ERROR, 7],
    'max-statements-per-line': [ERROR, { max: 1 }],
    'max-nested-callbacks': [ERROR, 2],
    'max-depth': [ERROR, { max: 3 }],
    'max-lines': [
      ERROR,
      {
        max: 150,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
  },
};
