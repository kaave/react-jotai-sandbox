import { genUuid } from '../../../../libs/utils/uuid';
import type { BodyText } from '../../models/Todo/bodyText';
import { useTodosCommands } from '../../states/todos';

export function useNewTodo(): (bodyText: BodyText) => void {
  const { add } = useTodosCommands();
  return (bodyText: BodyText) => add([{ bodyText, completed: false, id: genUuid() }]);
}
