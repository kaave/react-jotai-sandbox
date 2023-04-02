import type { Uuid } from '../../../../libs/utils/uuid';
import { useTodosCommands } from '../../states/todos';

export function useDeleteTodo(): (ids: readonly Uuid[]) => void {
  const { remove } = useTodosCommands();
  return remove;
}
