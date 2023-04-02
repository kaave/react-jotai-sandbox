import { useCallback } from 'react';
import type { Uuid } from '../../../../libs/utils/uuid';
import { useTodosCommands, useTodosQuery } from '../../states/todos';

export function useToggleTodo(): (id: Uuid) => void {
  const todos = useTodosQuery();
  const { update } = useTodosCommands();

  return useCallback(
    id => update(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))),
    [todos, update],
  );
}
