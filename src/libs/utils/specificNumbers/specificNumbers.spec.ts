import {
  integer,
  negative,
  negativeInteger,
  nonNegative,
  nonNegativeInteger,
  nonPositive,
  nonPositiveInteger,
  nonZero,
  nonZeroInteger,
  positive,
  positiveInteger,
} from './specificNumbers';

describe('specificNumbers', () => {
  describe('integer', () => {
    const integerError = new Error('Invalid Integer');
    describe('factory', () => {
      it('正の整数は入力値を返す', () => {
        expect(integer(1)).toBe(1);
      });
      it('正の小数はエラーを返す', () => {
        expect(integer(0.1)).toEqual(integerError);
      });
      it('0 は入力値を返す', () => {
        expect(integer(0)).toBe(0);
      });
      it('負の小数はエラーを返す', () => {
        expect(integer(-0.1)).toEqual(integerError);
      });
      it('負の整数は入力値を返す', () => {
        expect(integer(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(integer(1, 'unsafe')).toBe(1);
        expect(integer(0.1, 'unsafe')).toBe(0.1);
        expect(integer(0, 'unsafe')).toBe(0);
        expect(integer(-0.1, 'unsafe')).toBe(-0.1);
        expect(integer(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('negative', () => {
    describe('factory', () => {
      const negativeError = new Error('Invalid Negative');
      it('正の整数はエラーを返す', () => {
        expect(negative(1)).toEqual(negativeError);
      });
      it('正の小数はエラーを返す', () => {
        expect(negative(0.1)).toEqual(negativeError);
      });
      it('0 はエラーを返す', () => {
        expect(negative(0)).toEqual(negativeError);
      });
      it('負の小数は入力値を返す', () => {
        expect(negative(-0.1)).toBe(-0.1);
      });
      it('負の整数は入力値を返す', () => {
        expect(negative(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(negative(1, 'unsafe')).toBe(1);
        expect(negative(0.1, 'unsafe')).toBe(0.1);
        expect(negative(0, 'unsafe')).toBe(0);
        expect(negative(-0.1, 'unsafe')).toBe(-0.1);
        expect(negative(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('negativeInteger', () => {
    describe('factory', () => {
      const negativeIntegerError = new Error('Invalid NegativeInteger');
      it('正の整数はエラーを返す', () => {
        expect(negativeInteger(1)).toEqual(negativeIntegerError);
      });
      it('正の小数はエラーを返す', () => {
        expect(negativeInteger(0.1)).toEqual(negativeIntegerError);
      });
      it('0 はエラーを返す', () => {
        expect(negativeInteger(0)).toEqual(negativeIntegerError);
      });
      it('負の小数はエラーを返す', () => {
        expect(negativeInteger(-0.1)).toEqual(negativeIntegerError);
      });
      it('負の整数は入力値を返す', () => {
        expect(negativeInteger(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(negativeInteger(1, 'unsafe')).toBe(1);
        expect(negativeInteger(0.1, 'unsafe')).toBe(0.1);
        expect(negativeInteger(0, 'unsafe')).toBe(0);
        expect(negativeInteger(-0.1, 'unsafe')).toBe(-0.1);
        expect(negativeInteger(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('nonNegative', () => {
    describe('factory', () => {
      const nonNegativeError = new Error('Invalid NonNegative');
      it('正の整数は入力値を返す', () => {
        expect(nonNegative(1)).toBe(1);
      });
      it('正の小数は入力値を返す', () => {
        expect(nonNegative(0.1)).toBe(0.1);
      });
      it('0 は 入力値を返す', () => {
        expect(nonNegative(0)).toBe(0);
      });
      it('負の小数はエラーを返す', () => {
        expect(nonNegative(-0.1)).toEqual(nonNegativeError);
      });
      it('負の整数はエラーを返す', () => {
        expect(nonNegative(-1)).toEqual(nonNegativeError);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(nonNegative(1, 'unsafe')).toBe(1);
        expect(nonNegative(0.1, 'unsafe')).toBe(0.1);
        expect(nonNegative(0, 'unsafe')).toBe(0);
        expect(nonNegative(-0.1, 'unsafe')).toBe(-0.1);
        expect(nonNegative(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('nonNegativeInteger', () => {
    describe('factory', () => {
      const nonNegativeIntegerError = new Error('Invalid NonNegativeInteger');
      it('正の整数は入力値を返す', () => {
        expect(nonNegativeInteger(1)).toBe(1);
      });
      it('正の小数はエラーを返す', () => {
        expect(nonNegativeInteger(0.1)).toEqual(nonNegativeIntegerError);
      });
      it('0 は 入力値を返す', () => {
        expect(nonNegativeInteger(0)).toBe(0);
      });
      it('負の小数はエラーを返す', () => {
        expect(nonNegativeInteger(-0.1)).toEqual(nonNegativeIntegerError);
      });
      it('負の整数はエラーを返す', () => {
        expect(nonNegativeInteger(-1)).toEqual(nonNegativeIntegerError);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(nonNegativeInteger(1, 'unsafe')).toBe(1);
        expect(nonNegativeInteger(0.1, 'unsafe')).toBe(0.1);
        expect(nonNegativeInteger(0, 'unsafe')).toBe(0);
        expect(nonNegativeInteger(-0.1, 'unsafe')).toBe(-0.1);
        expect(nonNegativeInteger(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('nonPositive', () => {
    describe('factory', () => {
      const nonPositiveError = new Error('Invalid NonPositive');
      it('正の整数はエラーを返す', () => {
        expect(nonPositive(1)).toEqual(nonPositiveError);
      });
      it('正の小数はエラーを返す', () => {
        expect(nonPositive(0.1)).toEqual(nonPositiveError);
      });
      it('0 は入力値を返す', () => {
        expect(nonPositive(0)).toBe(0);
      });
      it('負の小数は入力値を返す', () => {
        expect(nonPositive(-0.1)).toBe(-0.1);
      });
      it('負の整数は入力値を返す', () => {
        expect(nonPositive(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(nonPositive(1, 'unsafe')).toBe(1);
        expect(nonPositive(0.1, 'unsafe')).toBe(0.1);
        expect(nonPositive(0, 'unsafe')).toBe(0);
        expect(nonPositive(-0.1, 'unsafe')).toBe(-0.1);
        expect(nonPositive(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('nonPositiveInteger', () => {
    describe('factory', () => {
      const nonPositiveIntegerError = new Error('Invalid NonPositiveInteger');
      it('正の整数はエラーを返す', () => {
        expect(nonPositiveInteger(1)).toEqual(nonPositiveIntegerError);
      });
      it('正の小数はエラーを返す', () => {
        expect(nonPositiveInteger(0.1)).toEqual(nonPositiveIntegerError);
      });
      it('0 は入力値を返す', () => {
        expect(nonPositiveInteger(0)).toBe(0);
      });
      it('負の小数はエラーを返す', () => {
        expect(nonPositiveInteger(-0.1)).toEqual(nonPositiveIntegerError);
      });
      it('負の整数は入力値を返す', () => {
        expect(nonPositiveInteger(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(nonPositiveInteger(1, 'unsafe')).toBe(1);
        expect(nonPositiveInteger(0.1, 'unsafe')).toBe(0.1);
        expect(nonPositiveInteger(0, 'unsafe')).toBe(0);
        expect(nonPositiveInteger(-0.1, 'unsafe')).toBe(-0.1);
        expect(nonPositiveInteger(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('nonZero', () => {
    describe('factory', () => {
      const nonZeroError = new Error('Invalid NonZero');
      it('正の整数は入力値を返す', () => {
        expect(nonZero(1)).toBe(1);
      });
      it('正の小数は入力値を返す', () => {
        expect(nonZero(0.1)).toBe(0.1);
      });
      it('0 はエラーを返す', () => {
        expect(nonZero(0)).toEqual(nonZeroError);
      });
      it('負の小数は入力値を返す', () => {
        expect(nonZero(-0.1)).toBe(-0.1);
      });
      it('負の整数は入力値を返す', () => {
        expect(nonZero(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(nonZero(1, 'unsafe')).toBe(1);
        expect(nonZero(0.1, 'unsafe')).toBe(0.1);
        expect(nonZero(0, 'unsafe')).toBe(0);
        expect(nonZero(-0.1, 'unsafe')).toBe(-0.1);
        expect(nonZero(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('nonZeroInteger', () => {
    describe('factory', () => {
      const nonZeroIntegerError = new Error('Invalid NonZeroInteger');
      it('正の整数は入力値を返す', () => {
        expect(nonZeroInteger(1)).toBe(1);
      });
      it('正の小数はエラーを返す', () => {
        expect(nonZeroInteger(0.1)).toEqual(nonZeroIntegerError);
      });
      it('0 はエラーを返す', () => {
        expect(nonZeroInteger(0)).toEqual(nonZeroIntegerError);
      });
      it('負の小数はエラーを返す', () => {
        expect(nonZeroInteger(-0.1)).toEqual(nonZeroIntegerError);
      });
      it('負の整数は入力値を返す', () => {
        expect(nonZeroInteger(-1)).toBe(-1);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(nonZeroInteger(1, 'unsafe')).toBe(1);
        expect(nonZeroInteger(0.1, 'unsafe')).toBe(0.1);
        expect(nonZeroInteger(0, 'unsafe')).toBe(0);
        expect(nonZeroInteger(-0.1, 'unsafe')).toBe(-0.1);
        expect(nonZeroInteger(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('positive', () => {
    describe('factory', () => {
      const positiveError = new Error('Invalid Positive');
      it('正の整数は入力値を返す', () => {
        expect(positive(1)).toBe(1);
      });
      it('正の小数は入力値を返す', () => {
        expect(positive(0.1)).toBe(0.1);
      });
      it('0 はエラーを返す', () => {
        expect(positive(0)).toEqual(positiveError);
      });
      it('負の小数はエラーを返す', () => {
        expect(positive(-0.1)).toEqual(positiveError);
      });
      it('負の整数はエラーを返す', () => {
        expect(positive(-1)).toEqual(positiveError);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(positive(1, 'unsafe')).toBe(1);
        expect(positive(0.1, 'unsafe')).toBe(0.1);
        expect(positive(0, 'unsafe')).toBe(0);
        expect(positive(-0.1, 'unsafe')).toBe(-0.1);
        expect(positive(-1, 'unsafe')).toBe(-1);
      });
    });
  });

  describe('positiveInteger', () => {
    describe('factory', () => {
      const positiveIntegerError = new Error('Invalid PositiveInteger');
      it('正の整数は入力値を返す', () => {
        expect(positiveInteger(1)).toBe(1);
      });
      it('正の小数はエラーを返す', () => {
        expect(positiveInteger(0.1)).toEqual(positiveIntegerError);
      });
      it('0 はエラーを返す', () => {
        expect(positiveInteger(0)).toEqual(positiveIntegerError);
      });
      it('負の小数はエラーを返す', () => {
        expect(positiveInteger(-0.1)).toEqual(positiveIntegerError);
      });
      it('負の整数はエラーを返す', () => {
        expect(positiveInteger(-1)).toEqual(positiveIntegerError);
      });
      it('`unsafe` の場合は入力値に関わらずすべて入力値を返す', () => {
        expect(positiveInteger(1, 'unsafe')).toBe(1);
        expect(positiveInteger(0.1, 'unsafe')).toBe(0.1);
        expect(positiveInteger(0, 'unsafe')).toBe(0);
        expect(positiveInteger(-0.1, 'unsafe')).toBe(-0.1);
        expect(positiveInteger(-1, 'unsafe')).toBe(-1);
      });
    });
  });
});
