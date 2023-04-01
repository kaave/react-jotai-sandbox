import type { Todo } from '../../../features/TodoMvc/models/Todo';

export type ApplicationState = {
  todoList: readonly Todo[];
};
