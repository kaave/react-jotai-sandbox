import { useCallback } from 'react';
import type { Uuid } from '../../../../libs/utils/uuid';
import type { BodyText } from '../../models/Todo/bodyText';
import { useTodosCommands, useTodosQuery } from '../../states/todos';

export function useChangeBody(): (id: Uuid, bodyText: BodyText) => void {
  const todos = useTodosQuery();
  const { update } = useTodosCommands();

  return useCallback(
    (id: Uuid, bodyText: BodyText) => update(todos.map(t => (t.id === id ? { ...t, bodyText } : t))),
    [todos, update],
  );
}
