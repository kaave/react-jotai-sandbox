/**
 * @file 大まかな複雑性を ESLint で図るための設定。
 */

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
    complexity: [WARN, 5],
    'max-params': [WARN, 4],
    'max-statements': [WARN, 7],
    'max-statements-per-line': [WARN, { max: 1 }],
    'max-nested-callbacks': [WARN, 2],
    'max-depth': [WARN, { max: 3 }],
    'max-lines': [
      WARN,
      {
        max: 150,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
  },
};
