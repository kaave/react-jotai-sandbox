import type { ComponentProps } from 'react';
import { useCallback, useMemo } from 'react';
import { NewTodoInput } from './components/NewTodoInput';
import { TodoList } from './components/TodoList';
import { UnderBar } from './components/UnderBar';
import { genUuid } from '../../libs/utils/uuid';
import type { ApplicationState } from '../../common/context/Application';
import styles from './index.module.css';
import { bodyText } from './models/Todo/bodyText';

type TodoListProps = ComponentProps<typeof TodoList>;

type Props = {
  appState: ApplicationState;
  setAppState: (fn: (prevState: ApplicationState) => ApplicationState) => void;
  pathname: string;
};

export const TodoMvc = ({ appState, setAppState, pathname }: Props): JSX.Element => {
  const { todos } = appState;
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

      setAppState(({ todos, ...rest }) => ({
        ...rest,
        todos: [
          {
            bodyText: bodyTextProposal,
            completed: false,
            id: genUuid(),
          },
          ...todos,
        ],
      }));
    },
    [setAppState],
  );

  const removeHandler = useCallback<TodoListProps['onRemove']>(
    id => setAppState(({ todos, ...rest }) => ({ ...rest, todos: todos.filter(t => t.id !== id) })),
    [setAppState],
  );

  const toggleHandler = useCallback<TodoListProps['onToggle']>(
    id => {
      setAppState(({ todos, ...rest }) => ({
        ...rest,
        todos: todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
      }));
    },
    [setAppState],
  );

  const handleChangeText = useCallback<TodoListProps['onChangeText']>(
    (id, todoBodyText) => {
      const bodyTextProposal = bodyText(todoBodyText);
      if (bodyTextProposal instanceof Error) {
        return;
      }

      setAppState(({ todos, ...rest }) => ({
        ...rest,
        todos: todos.map(t => (t.id === id ? { ...t, bodyTextProposal } : t)),
      }));
    },
    [setAppState],
  );

  const toggleAllCheckboxHandler = useCallback<TodoListProps['onToggleAll']>(
    checked => {
      setAppState(({ todos, ...rest }) => ({
        ...rest,
        todos: todos.map(t => ({ ...t, completed: checked })),
      }));
    },
    [setAppState],
  );

  const handleClearCompleted = useCallback(
    () =>
      setAppState(({ todos, ...prev }) => ({
        ...prev,
        todos: todos.filter(({ completed }) => !completed),
      })),
    [setAppState],
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
