import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from '../features/NotFound';
import { TodoMvc } from '../features/TodoMvc';
import { LocalStorageKey } from './model';
import type { ComponentProps } from 'react';
import { useCallback, useEffect } from 'react';
import type { ApplicationState } from '../common/context/Application';
import { useApplicationDispatch, useApplicationState, ApplicationProvider } from '../common/context/Application';

export const App = (): JSX.Element => (
  <ErrorBoundary>
    <BrowserRouter>
      <ApplicationProvider>
        <Core />
      </ApplicationProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

type SetAppState = (fn: (prevState: ApplicationState) => ApplicationState) => void;

const Core = (): JSX.Element => {
  const appState = useApplicationState();
  const dispatcher = useApplicationDispatch();

  const setAppState = useCallback<SetAppState>(
    (fn) => dispatcher.update(fn(appState).todoList),
    [appState, dispatcher],
  );

  // if appState has changes, save it LocalStorage.
  useEffect(() => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState), // convert JavaScript Object to string
    );
  }, [appState]);

  return (
    <Routes>
      {/* Note: こうしないと pathname なしが NotFound にマッチしてしまう */}
      <Route path="/" element={<TodoMvcElement appState={appState} setAppState={setAppState} />}>
        <Route path=":pathname" />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const TodoMvcElement = ({
  appState,
  setAppState,
}: Pick<ComponentProps<typeof TodoMvc>, 'appState' | 'setAppState'>): JSX.Element => {
  const { pathname = '' } = useParams();

  return <TodoMvc appState={appState} setAppState={setAppState} pathname={`/${pathname}`} />;
};
