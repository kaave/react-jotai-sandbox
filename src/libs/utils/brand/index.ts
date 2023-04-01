/**
 * Create _Branded Types_.
 *
 * @template Name Name of new type.
 * @template Type Parent type.
 *
 * @see {@link https://github.com/microsoft/TypeScript/blob/f64f40d20511d2d2a9eb4fcc1ad6750977be2d40/src/compiler/types.ts#L21-L23 TypeScript compiler uses branded types}
 */
type Brand<Name extends string, Type extends string | number = string> = Type & {
  readonly __brand: Name;
};

/**
 * Create new branded types's factory function.
 *
 * @param name Name of new type.
 * @param validator Validator function.
 *
 * @returns Factory function.
 *
 * @example
 * ### `string`
 * ```tsx
 * const uuid =
 *   createBrand(
 *     'uuid',
 *     (input) => /^[\dA-Fa-f]{8}(?:-[\dA-Fa-f]{4}){3}-[\dA-Fa-f]{12}$/.test(input),
 *   );
 *
 * const id = uuid('11111111-2222-3333-4444-555555555555');
 * // => Error | Brand<"uuid", string>
 * ```
 *
 * ### `number`
 * ```tsx
 * const tinyBit = createBrand('tinyBit', (input: number) => input === 0 || input === 1);
 * const zero = tinyBit(0);
 * // => Error | Brand<"uuid", string>
 * ```
 */
export function brand<Name extends string, Input extends string | number = string>(
  name: Name,
  validator: (input: Input) => boolean,
): (input: Input) => Brand<Name, Input> | Error {
  return (input: Input) =>
    validator(input) ? (input as Brand<Name, Input>) : new Error(`\`${input}\` is not valid ${name}`);
}

/**
 * Get _Branded Types_ from factory.
 *
 * @template Source factory function's type.
 *
 * @example
 * ```ts
 * const uuid =
 *   createBrand(
 *     'uuid',
 *     (input) => /^[\dA-Fa-f]{8}(?:-[\dA-Fa-f]{4}){3}-[\dA-Fa-f]{12}$/.test(input),
 *   );
 * export type Uuid = PickBrand<typeof uuid>; // string & { readonly __brand: "uuid" }
 * ```
 */
export type PickBrand<
  Source extends
    | ((input: string) => Error | Brand<string, string>)
    | ((input: number) => Error | Brand<string, number>),
> = Exclude<ReturnType<Source>, Error>;
