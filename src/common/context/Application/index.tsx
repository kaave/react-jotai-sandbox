import { LocalStorageKey } from '../../../application/model';
import type { ApplicationState } from './model';
import type { Todo } from '../../../features/TodoMvc/models/Todo';
import { atom, useAtom } from 'jotai';

export * from './model';

type ProvideDispatcher = {
  add: (todos: readonly Todo[]) => void;
  remove: (ids: readonly Todo['id'][]) => void;
  update: (todos: readonly Todo[]) => void;
};

const stringifiedJSON = window.localStorage.getItem(LocalStorageKey.APP_STATE);

const appStateAtom = atom<Readonly<ApplicationState>>(
  typeof stringifiedJSON === 'string' ? (JSON.parse(stringifiedJSON) as ApplicationState) : { todos: [] },
);

export function useApplicationQuery(): ApplicationState {
  const [state] = useAtom(appStateAtom);

  return state;
}

export function useApplicationCommands(): ProvideDispatcher {
  const [, setState] = useAtom(appStateAtom);

  return {
    add: addTodos => setState(({ todos, ...rest }) => ({ ...rest, todos: [...todos, ...addTodos] })),
    remove: ids => setState(({ todos, ...rest }) => ({ ...rest, todos: todos.filter(({ id }) => !ids.includes(id)) })),
    update: todos => setState(({ ...rest }) => ({ ...rest, todos })),
  };
}
