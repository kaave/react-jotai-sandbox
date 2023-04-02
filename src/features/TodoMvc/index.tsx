import { memo, type ComponentProps } from 'react';
import { useCallback, useMemo } from 'react';
import { NewTodoInput } from './components/NewTodoInput';
import { TodoList } from './components/TodoList';
import { UnderBar } from './components/UnderBar';
import { uuid } from '../../libs/utils/uuid';
import styles from './index.module.css';
import { bodyText } from './models/Todo/bodyText';
import { useTodosQuery } from './states/todos';
import { useInteractors } from './interactors';
import type { Todo } from './models/Todo';

type TodoListProps = ComponentProps<typeof TodoList>;

type Props = {
  pathname: string;
};

export const TodoMvc = ({ pathname }: Props): JSX.Element => {
  const props = useTodoMvc(pathname);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TodoMvcStructure {...props} />;
};

// Note: この Props の組み方だと memo の意味たぶんあんまないよな…。
const TodoMvcStructure = memo(
  ({
    states: { pathname, todoListIsVisible, hasCompleted, backlogCount, presentationTodos },
    handlers: {
      handleAdd,
      removeHandler,
      toggleHandler,
      handleChangeText,
      toggleAllCheckboxHandler,
      handleClearCompleted,
    },
  }: {
    states: PageState;
    handlers: PageHandlers;
  }) => (
    <div>
      <section className={styles.todoapp}>
        <NewTodoInput onAdd={handleAdd} />
        {todoListIsVisible ? (
          <>
            <TodoList
              todos={presentationTodos}
              onRemove={removeHandler}
              onToggle={toggleHandler}
              onChangeText={handleChangeText}
              onToggleAll={toggleAllCheckboxHandler}
            />
            <UnderBar
              pathname={pathname}
              hasCompleted={hasCompleted}
              backlogCount={backlogCount}
              onClearCompleted={handleClearCompleted}
            />
          </>
        ) : null}
      </section>
    </div>
  ),
);

TodoMvcStructure.displayName = 'TodoMvcStructure';

type PageState = {
  pathname: string;
  /** TodoList を表示するか。 */
  todoListIsVisible: boolean;
  /** Completed が一個でもあるか。 */
  hasCompleted: boolean;
  /** Backlog の件数。 */
  backlogCount: number;
  /** 表示する Todo の一覧 */
  presentationTodos: readonly Todo[];
};

type PageHandlers = {
  handleAdd: (rawBodyText: string) => void;
  removeHandler: (id: string) => void;
  toggleHandler: (id: string) => void;
  handleChangeText: (id: string, value: string) => void;
  toggleAllCheckboxHandler: (checked: boolean) => void;
  handleClearCompleted: () => void;
};

/** Export するのは実質テストのため */
export function useTodoMvc(pathname: string): { states: PageState; handlers: PageHandlers } {
  const todos = useTodosQuery();
  const { newTodo, deleteTodo, toggleActive, changeBodyText, toggleAll } = useInteractors();

  /*
   * States
   */

  const todoListIsVisible = todos.length > 0;
  const hasCompleted = useMemo(() => todos.some(t => t.completed), [todos]);
  const backlogCount = useMemo(() => todos.filter(t => !t.completed).length, [todos]);
  const presentationTodos = useMemo(
    () => todos.filter(t => pathname === '/' || (pathname === '/active' ? !t.completed : t.completed)),
    [pathname, todos],
  );

  /*
   * Event handlers
   */

  /** 追加イベント発火〜〜〜 このコメントがなかったことになるのが悲しい */
  const handleAdd = useCallback(
    (rawBodyText: string) => {
      const bodyTextProposal = bodyText(rawBodyText);
      if (bodyTextProposal instanceof Error) {
        return;
      }

      newTodo(bodyTextProposal);
    },
    [newTodo],
  );

  const removeHandler = useCallback<TodoListProps['onRemove']>(
    idProposal => {
      const id = uuid(idProposal);
      if (!(id instanceof Error)) {
        deleteTodo([id]);
      }
    },
    [deleteTodo],
  );

  const toggleHandler = useCallback<TodoListProps['onToggle']>(
    idProposal => {
      const id = uuid(idProposal);
      if (!(id instanceof Error)) {
        toggleActive(id);
      }
    },
    [toggleActive],
  );

  const handleChangeText = useCallback<TodoListProps['onChangeText']>(
    (todoId, todoBodyText) => {
      const id = uuid(todoId);
      const bodyTextProposal = bodyText(todoBodyText);
      if (id instanceof Error || bodyTextProposal instanceof Error) {
        return;
      }

      changeBodyText(id, bodyTextProposal);
    },
    [changeBodyText],
  );

  const toggleAllCheckboxHandler = useCallback<TodoListProps['onToggleAll']>(
    checked => toggleAll(checked),
    [toggleAll],
  );

  const handleClearCompleted = useCallback(
    () => deleteTodo(todos.filter(({ completed }) => completed).map(({ id }) => id)),
    [deleteTodo, todos],
  );

  return useMemo(
    () => ({
      states: {
        pathname,
        todoListIsVisible,
        hasCompleted,
        backlogCount,
        presentationTodos,
      },
      handlers: {
        handleAdd,
        removeHandler,
        toggleHandler,
        handleChangeText,
        toggleAllCheckboxHandler,
        handleClearCompleted,
      },
    }),
    [
      backlogCount,
      handleAdd,
      handleChangeText,
      handleClearCompleted,
      hasCompleted,
      pathname,
      presentationTodos,
      removeHandler,
      todoListIsVisible,
      toggleAllCheckboxHandler,
      toggleHandler,
    ],
  );
}
