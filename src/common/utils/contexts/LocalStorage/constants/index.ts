/** 開発モードで動いてるか。 */
export const nowDevelopment = process.env.NODE_ENV !== 'production';

/**
 * LocalStorage の Key。
 * @todo スキーマから自動生成する。
 */
export const localStorageKeys = {
  todos: 'TODOS',
} as const satisfies Record<string, string>;
