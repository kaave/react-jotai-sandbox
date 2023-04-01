import { brand, type PickBrand } from '../brand';

const uuidLengths = [8, 4, 4, 4, 12] as const;
const versionHeaderIncludePosition = 2;

export const uuid = brand('uuid', input => /[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/.test(input));
/** UUID フォーマットの文字列。バージョンは問わない。 */
export type Uuid = PickBrand<typeof uuid>;

export function genUuid(): Uuid {
  return uuidLengths
    .map((length, i) => {
      const source = Math.floor(Math.random() * 16 ** length)
        .toString(16)
        .padStart(length, '0');

      return i === versionHeaderIncludePosition ? `4${source.slice(1)}` : source;
    })
    .join('-') as Uuid;
}
