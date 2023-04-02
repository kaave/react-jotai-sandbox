/*
 * Integer
 */
export type Integer = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __integer: unique symbol;
};

export function isInteger(n: number): n is Integer {
  return n % 1 === 0;
}

export function integer(n: number): Integer | Error;
export function integer(n: number, unsafe: 'unsafe'): Integer;
export function integer(n: number, unsafe?: 'unsafe'): Integer | Error {
  return unsafe === 'unsafe' || isInteger(n) ? (n as Integer) : new Error('Invalid Integer');
}

/*
 * Negative
 * n < 0.0
 */
export type Negative = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __negative: unique symbol;
};

export function isNegative(n: number): n is Negative {
  return n < 0;
}

export function negative(n: number): Negative | Error;
export function negative(n: number, unsafe: 'unsafe'): Negative;
export function negative(n: number, unsafe?: 'unsafe'): Negative | Error {
  return unsafe === 'unsafe' || isNegative(n) ? (n as Negative) : new Error('Invalid Negative');
}

/*
 * NegativeInteger
 * n < 0
 */
export type NegativeInteger = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __negativeInteger: unique symbol;
};

export function isNegativeInteger(n: number): n is NegativeInteger {
  return isNegative(n) && isInteger(n);
}

export function negativeInteger(n: number): NegativeInteger | Error;
export function negativeInteger(n: number, unsafe: 'unsafe'): NegativeInteger;
export function negativeInteger(n: number, unsafe?: 'unsafe'): NegativeInteger | Error {
  return unsafe === 'unsafe' || isNegativeInteger(n) ? (n as NegativeInteger) : new Error('Invalid NegativeInteger');
}

/*
 * NonNegative
 * n >= 0.0
 */
export type NonNegative = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __nonNegative: unique symbol;
};

export function isNonNegative(n: number): n is NonNegative {
  return !isNegative(n);
}

export function nonNegative(n: number): NonNegative | Error;
export function nonNegative(n: number, unsafe: 'unsafe'): NonNegative;
export function nonNegative(n: number, unsafe?: 'unsafe'): NonNegative | Error {
  return unsafe === 'unsafe' || isNonNegative(n) ? (n as NonNegative) : new Error('Invalid NonNegative');
}

/*
 * NonNegativeInteger
 * n >= 0
 */
export type NonNegativeInteger = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __nonNegativeInteger: unique symbol;
};

export function isNonNegativeInteger(n: number): n is NonNegativeInteger {
  return isNonNegative(n) && isInteger(n);
}

export function nonNegativeInteger(n: number): NonNegativeInteger | Error;
export function nonNegativeInteger(n: number, unsafe: 'unsafe'): NonNegativeInteger;
export function nonNegativeInteger(n: number, unsafe?: 'unsafe'): NonNegativeInteger | Error {
  return unsafe === 'unsafe' || isNonNegativeInteger(n)
    ? (n as NonNegativeInteger)
    : new Error('Invalid NonNegativeInteger');
}

/*
 * NonPositive
 * n <= 0.0
 */
export type NonPositive = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __nonPositive: unique symbol;
};

export function isNonPositive(n: number): n is NonPositive {
  return n <= 0;
}

export function nonPositive(n: number): NonPositive | Error;
export function nonPositive(n: number, unsafe: 'unsafe'): NonPositive;
export function nonPositive(n: number, unsafe?: 'unsafe'): NonPositive | Error {
  return unsafe === 'unsafe' || isNonPositive(n) ? (n as NonPositive) : new Error('Invalid NonPositive');
}

/*
 * NonPositiveInteger
 * n <= 0
 */
export type NonPositiveInteger = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __nonPositiveInteger: unique symbol;
};

export function isNonPositiveInteger(n: number): n is NonPositiveInteger {
  return isNonPositive(n) && isInteger(n);
}

export function nonPositiveInteger(n: number): NonPositiveInteger | Error;
export function nonPositiveInteger(n: number, unsafe: 'unsafe'): NonPositiveInteger;
export function nonPositiveInteger(n: number, unsafe?: 'unsafe'): NonPositiveInteger | Error {
  return unsafe === 'unsafe' || isNonPositiveInteger(n)
    ? (n as NonPositiveInteger)
    : new Error('Invalid NonPositiveInteger');
}

/*
 * NonZero
 * n != 0.0
 */
export type NonZero = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __nonZero: unique symbol;
};

export function isNonZero(n: number): n is NonZero {
  return n !== 0;
}

export function nonZero(n: number): NonZero | Error;
export function nonZero(n: number, unsafe: 'unsafe'): NonZero;
export function nonZero(n: number, unsafe?: 'unsafe'): NonZero | Error {
  return unsafe === 'unsafe' || isNonZero(n) ? (n as NonZero) : new Error('Invalid NonZero');
}

/*
 * NonZeroInteger
 * n != 0
 */
export type NonZeroInteger = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __nonZeroInteger: unique symbol;
};

export function isNonZeroInteger(n: number): n is NonZeroInteger {
  return isNonZero(n) && isInteger(n);
}

export function nonZeroInteger(n: number): NonZeroInteger | Error;
export function nonZeroInteger(n: number, unsafe: 'unsafe'): NonZeroInteger;
export function nonZeroInteger(n: number, unsafe?: 'unsafe'): NonZeroInteger | Error {
  return unsafe === 'unsafe' || isNonZeroInteger(n) ? (n as NonZeroInteger) : new Error('Invalid NonZeroInteger');
}

/*
 * Positive
 * n > 0.0
 */
export type Positive = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __positive: unique symbol;
};

export function isPositive(n: number): n is Positive {
  return !isNonPositive(n);
}

export function positive(n: number): Positive | Error;
export function positive(n: number, unsafe: 'unsafe'): Positive;
export function positive(n: number, unsafe?: 'unsafe'): Positive | Error {
  return unsafe === 'unsafe' || isPositive(n) ? (n as Positive) : new Error('Invalid Positive');
}

/*
 * PositiveInteger
 * n > 0
 */
export type PositiveInteger = number & {
  /** @deprecated 識別用の型につき直接アクセスすることは禁止。 */
  readonly __positiveInteger: unique symbol;
};

export function isPositiveInteger(n: number): n is PositiveInteger {
  return isPositive(n) && isInteger(n);
}

export function positiveInteger(n: number): PositiveInteger | Error;
export function positiveInteger(n: number, unsafe: 'unsafe'): PositiveInteger;
export function positiveInteger(n: number, unsafe?: 'unsafe'): PositiveInteger | Error {
  return unsafe === 'unsafe' || isPositiveInteger(n) ? (n as PositiveInteger) : new Error('Invalid PositiveInteger');
}

export type IntegerFamily =
  | Integer
  | NegativeInteger
  | NonNegativeInteger
  | NonPositiveInteger
  | NonZeroInteger
  | PositiveInteger;

/*
 * calc integers
 */

/**
 * 計算して {@link Integer} を返却する。四則演算については {@link IntegerFamily} を￥受け取ることを前提としている。
 *
 * @remarks
 * `div` は結果が {@link Integer} である保証がないため作っていない。
 */
// export const MathInteger = {
//   /** 加算。 */
//   add: (...args: readonly IntegerFamily[]): Integer => args.reduce((acc, n) => acc + n),
//   /** 減算。 */
//   sub: (...args: readonly IntegerFamily[]): Integer => args.reduce((acc, n) => acc - n),
//   /** 乗算。 */
//   mul: (...args: readonly IntegerFamily[]): Integer => args.reduce((acc, n) => acc * n),
//   /** 丸め。 */
//   round: (argv: number): Integer => Math.round(argv) as Integer,
// } as const;
