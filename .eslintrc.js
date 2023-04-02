const ON = 2;
const OFF = 0;
const WARN = 1;

module.exports = {
  ignorePatterns: ['.eslintrc.*', 'playwright.config.ts', 'vite.config.*', 'dist/**/*', 'build/**/*', '**/*.d.ts'],
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
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
    /** Arrow function の return は必要ない場合省略する。 */
    'arrow-body-style': [ON, 'as-needed'],
    // あんまり関数の巻き上げ気にする場面はないし、本当にやばいのは tsc がだいたい落とすのでOK
    'no-use-before-define': OFF,
    // wait 関数の邪魔
    'no-promise-executor-return': OFF,
    // switch の default 句を無効化する。
    // なお代わりに `@typescript-eslint/switch-exhaustiveness-check` で網羅性を担保しているため、あわせて参照のこと。
    'default-case': OFF,
    /** 条件分岐によって、戻り値を返す/返さないが統一されていることを保証する。TS で担保するため無効化。 */
    'consistent-return': OFF,
    /** `_` を先頭または末尾に付与することを禁止する。特殊な命名を除き有効。 */
    'no-underscore-dangle': [ON, { allow: ['__dirname', '__filename'] }],
    /** console API を許可する。むやみやったら使わないこと。 */
    'no-console': OFF,
    /** 関数の代入式を return するのを許可する。Arrow function のみ無効化したいがオプションがないので仕方なく全部許可。 */
    'no-return-assign': OFF,
    /** var を先頭に配置するのを強制しない。 declare と相性が悪く、また JS 空間でももう var は使わない */
    'vars-on-top': OFF,
    /** var を許可する。 declare と相性が悪い。 */
    'no-var': OFF,
    /** 同名の local 変数を許可する。 */
    'no-shadow': OFF,
    /** yield を利用しない Generator を許可する。 */
    'require-yield': OFF,

    /** 未使用の変数を禁止する。 TS 側の設定のみ有効にしている。 */
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': ON,

    /** switch ですべての値を網羅していることを強制する。 */
    '@typescript-eslint/switch-exhaustiveness-check': ON,
    /** 型情報のみ用いている要素は type-only import を強制する。 */
    '@typescript-eslint/consistent-type-imports': ON,
    /** Mutable な引数には readonly (Readonly) を強制する。ルールが制御困難なため無効化するが、基本的に付与すること。 */
    '@typescript-eslint/prefer-readonly-parameter-types': OFF,
    /** async function が await を利用してなくても構わない。Promise を返却するために利用するケースがあるため。 */
    '@typescript-eslint/require-await': OFF,
    /** 処理していない Promise を許可する。 */
    '@typescript-eslint/no-floating-promises': OFF,
    /** 意図していないであろう箇所で利用されている Promise を禁止する。 Iteration 時などに利用する void return のケースは例外。 */
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    /** 関数/メソッドの戻り値型を強制する */
    '@typescript-eslint/explicit-function-return-type': [
      ON,
      {
        /** 引数はなくても良い */
        allowExpressions: true,
        /** type で定義した関数型を使ってる場合は端折る */
        allowTypedFunctionExpressions: true,
        /** high order function も型を請求 */
        allowHigherOrderFunctions: true,
        /** `as const` で型を固めた戻り値の場合は許可 */
        allowDirectConstAssertionInArrowFunctions: true,
        // /** 特別許可 */
        // allowNames: ['render'],
      },
    ],

    /** 略語による命名を一部の例外を除き禁止する。 */
    'unicorn/prevent-abbreviations': [
      ON,
      {
        replacements: {
          i: { index: false },
          j: { index: false },
          props: { properties: false },
          e: { error: false },
          err: { error: false },
          env: { environment: false },
          dir: { directory: false, direction: false },
          acc: { accumulator: false },
          dist: { distribution: false },
          temp: { temporary: false },
          argv: { argument: false },
          args: { arguments: false, arguments_: false },
          fn: { function_: false, function: false },
          func: { function_: false, function: false },
          prev: { previous: false },
          ref: { reference: false },
          req: { request: false },
          res: { response: false, result: false },
          param: { parameter: false },
          params: { parameters: false },
        },
      },
    ],
    /** `null` を禁止する。使い分ける必要があるため無効化。*/
    'unicorn/no-null': OFF,
    /** Iteration するメソッドにダイレクトに関数を渡すことを許可する。すぐに慣れる。 */
    'unicorn/no-array-callback-reference': OFF,
    /** Reduce の使用を許可する。 */
    'unicorn/no-array-reduce': OFF,
    /**
     * .forEach(...) の使用を許可する。 for .. of より高速。
     * @see https://jsben.ch/aGSc0 Benchmark
     */
    'unicorn/no-array-for-each': OFF,
    /** ルール指定なしの一括 eslint-disable を禁止する。無効化。 */
    'unicorn/no-abusive-eslint-disable': OFF,
    /** console.x で半角スペースを利用して出力の調整するのを禁止する。無効化。大きなお世話 */
    'unicorn/no-console-spaces': OFF,
    /** camelCase, PascalCase以外のファイル名は原則禁止する。 */
    'unicorn/filename-case': [
      OFF,
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],

    // Prettier で整理するため不要
    'import/order': OFF,
    // default export は禁止
    'import/prefer-default-export': OFF,
    'import/no-default-export': ON,
    /** うまく動かない */
    'import/no-unresolved': OFF,
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        stories: 'always',
      },
    ],

    /** `<button />` に `type` Prop を強要する。意図しない Submit を防ぐため。 */
    'react/button-has-type': ON,
    /** Props | State は Object Destructuring して参照する */
    'react/destructuring-assignment': [
      ON,
      'always',
      {
        /** クラスフィールドは除外 */
        ignoreClassFields: true,
        /** Props は引数の括弧の中で展開する */
        destructureInSignature: 'always',
      },
    ],
    /** HOC (ex. memo) の際にのみなぜか怒られる。無効化。 */
    'react/display-name': OFF,
    /** `className` `style` など複雑性を著しく増加させる気配のする Prop を禁止する。 */
    'react/forbid-component-props': ON,
    // Component は Arrow function
    'react/function-component-definition': [ON, { namedComponents: 'arrow-function' }],
    /** `useState` の命名を `[foo, setFoo]` というルールで強制する。ただし Object destructuring している場合は除く。 */
    /** @todo なぜかエラーになってしまう。 ESLint: 8.27.0, eslint-plugin-react: 7.31.0 */
    // 'react/hook-use-state': [ON, { allowDestructuredState: true }],
    /** `boolean` の Prop で値を取る必要がない場合はつけない。 */
    'react/jsx-boolean-value': [ON, 'never', { always: [] }],
    /** タグを閉じる `>` の位置を固定する。 */
    'react/jsx-closing-bracket-location': [ON, 'line-aligned'],
    /** 閉じタグの位置を固定する。 */
    'react/jsx-closing-tag-location': ON,
    /** 文字列指定できる Prop や children の書き方を統一する。 */
    'react/jsx-curly-spacing': [ON, 'never', { allowMultiline: true }],
    /** JSX 中の `{ }` の中で無駄な改行を挟めないようにする */
    'react/jsx-curly-newline': [
      ON,
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    /** `=` の周囲のスペースを基本なしで固定 */
    'react/jsx-equals-spacing': [ON, 'never'],
    /** JSX を `.tsx` でも許可する */
    'react/jsx-filename-extension': [ON, { extensions: ['.tsx', '.jsx'] }],
    /** Props の改行を固定 */
    'react/jsx-first-prop-new-line': [ON, 'multiline-multiprop'],
    /** Fragment は必要のない限りシンプルな記法で統一 */
    'react/jsx-fragments': [ON, 'syntax'],
    /** JSX のインデントは `2` */
    'react/jsx-indent': [ON, 2],
    /** Props が関係するインデントは `2` */
    'react/jsx-indent-props': [ON, 2],
    /** `.bind()` 禁止 */
    'react/jsx-no-bind': ON,
    /** Context に `useMemo` `useCallback` されてない値を渡すのを禁止する。 */
    'react/jsx-no-constructed-context-values': ON,
    /** JSX で `&&` を禁止する。予期せぬレンダリングを防止するため。 */
    'react/jsx-no-leaked-render': ON,
    /** `a` タグに `javascript:` を渡すことを禁止する。危険。 */
    'react/jsx-no-script-url': ON,
    /** 意味の無い Fragment を禁止する。ただし変数展開のために使用するのは許容する。 `<>{'\u00A0'}</>` のような特殊文字を許可するため。 */
    'react/jsx-no-useless-fragment': [ON, { allowExpressions: true }],
    /**
     * 一行につき一コンポーネント
     * 半角スペースで区切られたパラグラフ + React Componentなどに対応できないため重すぎる。無効化
     */
    // 'react/jsx-one-expression-per-line': [ON, { allow: 'single-child' }],
    /** コンポーネントの命名は PascalCase で統一する。 */
    'react/jsx-pascal-case': ON,
    /** JSX 中の連続した改行やスペースを禁止する */
    'react/jsx-props-no-multi-spaces': ON,
    /** Props を Spread Operator で渡すのを禁止する。 */
    'react/jsx-props-no-spreading': ON,
    /** JSX の細かいスペースを指定 */
    'react/jsx-tag-spacing': [
      ON,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    /** JSX の細かい改行を指定 */
    'react/jsx-wrap-multilines': [
      ON,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    /** 初期化前に `setState` するのを禁止 */
    'react/no-access-state-in-setstate': ON,
    /** Iteration する際に `key` へ index を利用することを禁止する。 */
    'react/no-array-index-key': ON,
    /** Lifecycle methods で Arrow function の利用を禁止する。テストやパフォーマンスに悪影響を及ぼすため。 */
    'react/no-arrow-function-lifecycle': ON,
    /** dangerous...を禁止する。使う場合は明示的に無効化してコメントを書く。 */
    'react/no-danger': ON,
    /** 無効な HTML Attribute を禁止する。 */
    'react/no-invalid-html-attribute': ON,
    /** React element の命名に `Ns:foo` のような namespace を利用することを禁止する。 */
    'react/no-namespace': ON,
    /** Props の Default 値に新規インスタンスを作成する書き方を禁止する。 */
    /** @todo 7.31.0 ではまだない */
    // 'react/no-object-type-as-default-prop': ON,
    /** PureComponent で shouldComponentUpdate を使うことを禁止する。 */
    'react/no-redundant-should-component-update': ON,
    /** Function component の中で `this` を参照することを禁止する。 */
    'react/no-this-in-sfc': ON,
    /** ありがちな typo を禁止する。 */
    'react/no-typos': ON,
    /** コンポーネントの中でネストしたコンポーネントの宣言を禁止する。 */
    'react/no-unstable-nested-components': ON,
    /** 未使用の State を禁止する。 */
    'react/no-unused-state': ON,
    /** `componentWillUpdate` の中で `setState` を禁止する。 */
    'react/no-will-update-set-state': OFF,
    /** Function component で書ける際はそれを強要する。 */
    'react/prefer-stateless-function': [ON, { ignorePureComponents: true }],
    /** Don't use propType. Every projects use TS. */
    'react/prop-types': OFF,
    /** `/>` で閉じれる際はそれを強要する。 */
    'react/self-closing-comp': ON,
    /** Class Component のメソッドを指定の順番で並べる。 */
    'react/sort-comp': ON,
    /** Class Component の State は constructor 外で初期化する */
    'react/state-in-constructor': [ON, 'never'],
    /** `style` という命名の Props は Object で固定する。 */
    'react/style-prop-object': ON,
    /** `img` `br` など children をとらないタグが取ることを禁止する。 */
    'react/void-dom-elements-no-children': ON,

    /** 型で担保するので不要 */
    'react/require-default-props': OFF,
    'react/no-unused-prop-types': OFF,
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // トランスパイルしないので require() 許可
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
    /** For unit / integration test files */
    {
      files: ['./src/**/?(*.)+(spec|test).+(ts|tsx|js)'],
      extends: [
        // Note: Vitest でも問題なく使える
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      plugins: ['vitest'],
      rules: {
        'import/no-extraneous-dependencies': OFF,
      },
    },
    /** For e2e test files */
    {
      files: ['./e2e/**/?(*.)+(spec|test).+(ts|tsx|js)'],
      extends: ['plugin:playwright/playwright-test'],
    },
    /** For Storybook files */
    {
      files: ['**/?(*.)+(story|stories).+(ts|tsx|js)'],
      rules: {
        /** Allow default export. Storybook needs this. */
        'import/no-default-export': OFF,
        /** Allow spread operator on Props. It useful in Storybook. */
        'react/jsx-props-no-spreading': OFF,
      },
    },
  ],
};
