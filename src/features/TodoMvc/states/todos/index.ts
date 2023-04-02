/**
 * @file すべての Todo について管理する。
 */

import { atom, useAtom, type ExtractAtomValue } from 'jotai';
import type { Todo } from '../../models/Todo';

type Todos = Todo[];

type TodoCommands = {
  add: (todos: Readonly<Todos>) => void;
  remove: (ids: readonly Todo['id'][]) => void;
  update: (todos: Readonly<Todos>) => void;
};

const todoAtom = atom<Readonly<Todos>>([]);

export function useTodosQuery(): ExtractAtomValue<typeof todoAtom> {
  const [todos] = useAtom(todoAtom);

  // Note: ここでビジネスロジックが混じらない加工ならやってしまってよい。どんなものかはイメージがまだ湧いてない。
  return todos;
}

export function useTodosCommands(): Readonly<TodoCommands> {
  const [, setTodos] = useAtom(todoAtom);

  return {
    add: addTodos => setTodos(prev => [...prev, ...addTodos]),
    remove: ids => setTodos(prev => prev.filter(({ id }) => !ids.includes(id))),
    update: todos => setTodos(todos),
  };
}
