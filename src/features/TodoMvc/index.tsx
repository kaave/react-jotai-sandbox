import type { ComponentProps } from 'react';
import { useCallback, useMemo } from 'react';
import { NewTodoInput } from './components/NewTodoInput';
import { TodoList } from './components/TodoList';
import { UnderBar } from './components/UnderBar';
import { uuid } from '../../libs/utils/uuid';
import styles from './index.module.css';
import { bodyText } from './models/Todo/bodyText';
import { useTodosCommands, useTodosQuery } from './states/todos';
import { useNewTodo } from './interactors/newTodo';
import { useDeleteTodo } from './interactors/deleteTodo';

type TodoListProps = ComponentProps<typeof TodoList>;

type Props = {
  pathname: string;
};

export const TodoMvc = ({ pathname }: Props): JSX.Element => {
  const todos = useTodosQuery();
  const { update } = useTodosCommands();
  const newTodo = useNewTodo();
  const deleteTodo = useDeleteTodo();

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
    id => update(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))),
    [todos, update],
  );

  const handleChangeText = useCallback<TodoListProps['onChangeText']>(
    (todoId, todoBodyText) => {
      const id = uuid(todoId);
      const bodyTextProposal = bodyText(todoBodyText);
      if (id instanceof Error || bodyTextProposal instanceof Error) {
        return;
      }

      update(todos.map(t => (t.id === id ? { ...t, bodyText: bodyTextProposal } : t)));
    },
    [todos, update],
  );

  const toggleAllCheckboxHandler = useCallback<TodoListProps['onToggleAll']>(
    checked => update(todos.map(t => ({ ...t, completed: checked }))),
    [todos, update],
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
