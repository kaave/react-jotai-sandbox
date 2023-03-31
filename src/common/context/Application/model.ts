export type Todo = {
  id: string;
  bodyText: string;
  completed: boolean;
};

export type ApplicationState = {
  todoList: readonly Todo[];
};
