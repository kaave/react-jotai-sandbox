import { brand, type PickBrand } from '../../../../../libs/utils/brand';

/** 本文。なにも縛りがないのもあれなので最大20文字とした */
export const bodyText = brand('bodyText', input => input.length <= 20);
export type BodyText = PickBrand<typeof bodyText>;
