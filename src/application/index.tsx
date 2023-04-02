import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from '../features/NotFound';
import { TodoMvc } from '../features/TodoMvc';
import { LocalStorageProvider } from '../common/utils/contexts/LocalStorage';

export const App = (): JSX.Element => (
  <ErrorBoundary>
    <LocalStorageProvider storage={window.localStorage}>
      <BrowserRouter>
        <Core />
      </BrowserRouter>
    </LocalStorageProvider>
  </ErrorBoundary>
);

const Core = (): JSX.Element => (
  <Routes>
    {/* Note: こうしないと pathname なしが NotFound にマッチしてしまう */}
    <Route path="/" element={<TodoMvcElement />}>
      <Route path=":pathname" />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
const TodoMvcElement = (): JSX.Element => {
  const { pathname = '' } = useParams();

  return <TodoMvc pathname={`/${pathname}`} />;
};
