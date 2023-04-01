import { atom, useAtom } from 'jotai';
import type { Todo } from '../../models/Todo';

type Todos = readonly Todo[];

type TodoCommands = {
  add: (todos: readonly Todo[]) => void;
  remove: (ids: readonly Todo['id'][]) => void;
  update: (todos: readonly Todo[]) => void;
};

const todoAtom = atom<Readonly<Todos>>([]);

export function useTodosQuery(): Todos {
  const [todos] = useAtom(todoAtom);

  return todos;
}

export function useTodosCommands(): TodoCommands {
  const [, setTodos] = useAtom(todoAtom);

  return {
    add: addTodos => setTodos(prev => [...prev, ...addTodos]),
    remove: ids => setTodos(prev => prev.filter(({ id }) => !ids.includes(id))),
    update: todos => setTodos(todos),
  };
}
