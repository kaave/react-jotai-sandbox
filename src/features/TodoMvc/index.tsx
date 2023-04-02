import type { ComponentProps } from 'react';
import { useCallback, useMemo } from 'react';
import { NewTodoInput } from './components/NewTodoInput';
import { TodoList } from './components/TodoList';
import { UnderBar } from './components/UnderBar';
import { uuid } from '../../libs/utils/uuid';
import styles from './index.module.css';
import { bodyText } from './models/Todo/bodyText';
import { useTodosQuery } from './states/todos';
import { useInteractors } from './interactors';

type TodoListProps = ComponentProps<typeof TodoList>;

type Props = {
  pathname: string;
};

export const TodoMvc = ({ pathname }: Props): JSX.Element => {
  const todos = useTodosQuery();
  const { newTodo, deleteTodo, toggleActive, changeBodyText, toggleAll } = useInteractors();

  const hasCompleted = useMemo(() => todos.some(t => t.completed), [todos]);
  const backlogCount = useMemo(() => todos.filter(t => !t.completed).length, [todos]);
  const filteredTodoList = useMemo(
    () => todos.filter(t => pathname === '/' || (pathname === '/active' ? !t.completed : t.completed)),
    [pathname, todos],
  );

  const handleAdd = useCallback(
    (todoName: string) => {
      const bodyTextProposal = bodyText(todoName);
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

  return (
    <div>
      <section className={styles.todoapp}>
        <NewTodoInput onAdd={handleAdd} />
        {todos.length > 0 ? (
          <>
            <TodoList
              todos={filteredTodoList}
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
  );
};
