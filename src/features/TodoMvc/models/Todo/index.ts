import type { Uuid } from '../../../../libs/utils/uuid';
import { type BodyText } from './bodyText';

export type Todo = {
  id: Uuid;
  bodyText: BodyText;
  completed: boolean;
};
