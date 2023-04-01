import type { Todo } from '../../../features/TodoMvc/models/Todo';

export type ApplicationState = {
  todos: readonly Todo[];
};
