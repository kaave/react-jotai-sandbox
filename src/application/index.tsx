import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from '../features/NotFound';
import { TodoMvc } from '../features/TodoMvc';
// import { LocalStorageKey } from './model';
// import type { ComponentProps } from 'react';
// import { useEffect } from 'react';
// import { useApplicationQuery } from '../common/context/Application';

export const App = (): JSX.Element => (
  <ErrorBoundary>
    <BrowserRouter>
      <Core />
    </BrowserRouter>
  </ErrorBoundary>
);

// type SetAppState = (fn: (prevState: ApplicationState) => ApplicationState) => void;

const Core = (): JSX.Element => 
  // const appState = useApplicationQuery();
  // const dispatcher = useApplicationCommands();

  // const setAppState = useCallback<SetAppState>(fn => dispatcher.update(fn(appState).todos), [appState, dispatcher]);

  // if appState has changes, save it LocalStorage.
  // useEffect(() => {
  //   window.localStorage.setItem(
  //     LocalStorageKey.APP_STATE,
  //     JSON.stringify(appState), // convert JavaScript Object to string
  //   );
  // }, [appState]);

   (
     <Routes>
       {/* Note: こうしないと pathname なしが NotFound にマッチしてしまう */}
       <Route path="/" element={<TodoMvcElement />}>
         <Route path=":pathname" />
       </Route>
       <Route path="*" element={<NotFound />} />
     </Routes>
  )
;

const TodoMvcElement = (): JSX.Element => {
  const { pathname = '' } = useParams();

  return <TodoMvc pathname={`/${pathname}`} />;
};
