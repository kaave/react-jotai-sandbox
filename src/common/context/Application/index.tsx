import type { ReactNode } from 'react';
import { useContext, useCallback, useReducer, createContext } from 'react';
import { LocalStorageKey } from '../../../application/model';
import type { ApplicationState, Todo } from './model';

export * from './model';

type Action =
  | { type: 'added'; payload: Readonly<{ todos: readonly Todo[] }> }
  | { type: 'removed'; payload: Readonly<{ ids: readonly Todo['id'][] }> }
  | { type: 'updated'; payload: Readonly<{ todos: readonly Todo[] }> };

type ProvideDispatcher = {
  add: (todos: readonly Todo[]) => void;
  remove: (ids: readonly Todo['id'][]) => void;
  update: (todos: readonly Todo[]) => void;
};

const stringifiedJSON = window.localStorage.getItem(LocalStorageKey.APP_STATE);

const INITIAL_STATE: Readonly<ApplicationState> =
  typeof stringifiedJSON === 'string' ? (JSON.parse(stringifiedJSON) as ApplicationState) : { todoList: [] };

const reducer = (state: Readonly<ApplicationState>, action: Action): Readonly<ApplicationState> => {
  switch (action.type) {
    case 'added': {
      return {
        ...state,
        todoList: [...state.todoList, ...action.payload.todos],
      };
    }

    case 'removed': {
      return {
        ...state,
        todoList: state.todoList.filter(({ id }) => !action.payload.ids.includes(id)),
      };
    }

    case 'updated': {
      return {
        ...state,
        todoList: action.payload.todos,
      };
    }
  }
};

const ApplicationStateContext = createContext<ApplicationState | null>(null);
const ApplicationDispatcherContext = createContext<ProvideDispatcher | null>(null);

type ProviderProps = {
  children: ReactNode;
  initialState?: Readonly<ApplicationState>;
};

export const ApplicationProvider = ({ children, initialState = INITIAL_STATE }: ProviderProps): JSX.Element => {
  const { state, dispatcher } = useApplicationContextCore(initialState);

  return (
    <ApplicationStateContext.Provider value={state}>
      <ApplicationDispatcherContext.Provider value={dispatcher}>{children}</ApplicationDispatcherContext.Provider>
    </ApplicationStateContext.Provider>
  );
};

function useApplicationContextCore(initialState: Readonly<ApplicationState>): {
  state: ApplicationState;
  dispatcher: ProvideDispatcher;
} {
  const [state, dispatch] = useReducer(reducer, initialState);
  const add = useCallback<ProvideDispatcher['add']>((todos) => dispatch({ type: 'added', payload: { todos } }), []);
  const remove = useCallback<ProvideDispatcher['remove']>((ids) => dispatch({ type: 'removed', payload: { ids } }), []);
  const update = useCallback<ProvideDispatcher['update']>(
    (todos) => dispatch({ type: 'updated', payload: { todos } }),
    [],
  );

  return {
    state,
    dispatcher: { add, update, remove },
  };
}

export function useApplicationState(): ApplicationState {
  const state = useContext(ApplicationStateContext);

  if (state === null) throw new Error('Not found Application state.');

  return state;
}

export function useApplicationDispatch(): ProvideDispatcher {
  const dispatcher = useContext(ApplicationDispatcherContext);

  if (dispatcher === null) throw new Error('Not found Application dispatcher.');

  return dispatcher;
}
