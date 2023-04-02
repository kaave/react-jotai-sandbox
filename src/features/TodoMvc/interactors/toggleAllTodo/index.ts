import { useCallback } from 'react';
import { useTodosCommands, useTodosQuery } from '../../states/todos';

export function useToggleAllTodo(): (checked: boolean) => void {
  const todos = useTodosQuery();
  const { update } = useTodosCommands();

  return useCallback((checked: boolean) => update(todos.map(t => ({ ...t, completed: checked }))), [todos, update]);
}
