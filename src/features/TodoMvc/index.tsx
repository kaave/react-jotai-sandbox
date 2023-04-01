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
  const { todoList } = appState;
  const hasCompleted = useMemo(() => todoList.some(t => t.completed), [todoList]);
  const backlogCount = useMemo(() => todoList.filter(t => !t.completed).length, [todoList]);
  const filteredTodoList = useMemo(
    () => todoList.filter(t => pathname === '/' || (pathname === '/active' ? !t.completed : t.completed)),
    [pathname, todoList],
  );

  const handleAdd = useCallback(
    (todoName: string) => {
      const bodyTextProposal = bodyText(todoName);
      if (bodyTextProposal instanceof Error) {
        return;
      }

      setAppState(({ todoList, ...rest }) => ({
        ...rest,
        todoList: [
          {
            bodyText: bodyTextProposal,
            completed: false,
            id: genUuid(),
          },
          ...todoList,
        ],
      }));
    },
    [setAppState],
  );

  const removeHandler = useCallback<TodoListProps['onRemove']>(
    id => setAppState(({ todoList, ...rest }) => ({ ...rest, todoList: todoList.filter(t => t.id !== id) })),
    [setAppState],
  );

  const toggleHandler = useCallback<TodoListProps['onToggle']>(
    id => {
      setAppState(({ todoList, ...rest }) => ({
        ...rest,
        todoList: todoList.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
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

      setAppState(({ todoList, ...rest }) => ({
        ...rest,
        todoList: todoList.map(t => (t.id === id ? { ...t, bodyTextProposal } : t)),
      }));
    },
    [setAppState],
  );

  const toggleAllCheckboxHandler = useCallback<TodoListProps['onToggleAll']>(
    checked => {
      setAppState(({ todoList, ...rest }) => ({
        ...rest,
        todoList: todoList.map(t => ({ ...t, completed: checked })),
      }));
    },
    [setAppState],
  );

  const handleClearCompleted = useCallback(
    () =>
      setAppState(({ todoList, ...prev }) => ({
        ...prev,
        todoList: todoList.filter(({ completed }) => !completed),
      })),
    [setAppState],
  );

  return (
    <div>
      <section className={styles.todoapp}>
        <NewTodoInput onAdd={handleAdd} />
        {todoList.length > 0 ? (
          <>
            <TodoList
              todoList={filteredTodoList}
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
