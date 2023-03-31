module.exports = {
  /** 1行あたりの最大文字数は 120 とする。なんかいい感じ。 */
  printWidth: 120,
  /** インデント幅は 2 とする。なんかいい感じ。 */
  tabWidth: 2,
  /** タブの代わりに半角スペース。 */
  useTabs: false,
  /** セミコロンはありとする。 */
  semi: true,
  /** ダブルではなくシングルクォーテーションを使う */
  singleQuote: true,
  trailingComma: 'all',
  /** Arrow function の括弧は必要なときだけ */
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.css',
      options: {
        parser: 'css',
        tabWidth: 4,
        singleQuote: false,
      },
    },
    {
      files: '*.json',
      options: {
        tabWidth: 4,
        singleQuote: false,
      },
    },
  ],
};
