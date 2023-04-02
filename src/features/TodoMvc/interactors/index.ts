import { useNewTodo } from './newTodo';
import { useDeleteTodo } from './deleteTodo';
import { useToggleTodo } from './toggleTodo';
import { useChangeBody } from './changeBody';
import { useToggleAllTodo } from './toggleAllTodo';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInteractors() {
  const newTodo = useNewTodo();
  const deleteTodo = useDeleteTodo();
  const toggleActive = useToggleTodo();
  const changeBodyText = useChangeBody();
  const toggleAll = useToggleAllTodo();

  return {
    newTodo,
    deleteTodo,
    toggleActive,
    changeBodyText,
    toggleAll,
  };
}
