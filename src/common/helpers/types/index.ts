/**
 * 引数の型、または `null` を意味する型を生成する。
 *
 * @template T - 取りうる型。
 */
export type Maybe<T> = T | null;
/**
 * 引数の型、またはその配列を意味する型を生成する。
 *
 * @template T - 取りうる型。
 * @template RO - `'readonly'` で配列が `readonly` となる。default は `undefined`。
 */
export type Arrayable<T, RO extends 'readonly' | undefined = undefined> =
  | T
  | (RO extends 'readonly' ? readonly T[] : T[]);
