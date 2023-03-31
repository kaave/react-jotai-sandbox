import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState, useCallback } from 'react';
import * as styles from './index.module.css';

type Props = {
  onAdd: (todoName: string) => void;
};

export const NewTodoInput = ({ onAdd }: Props): JSX.Element => {
  const [value, setValue] = useState('');

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setValue(event.currentTarget.value),
    [],
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (value) {
        onAdd(value);
        setValue('');
      }
    },
    [onAdd, value],
  );

  return (
    <header>
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.newTodo}
          placeholder="What needs to be done?"
          onChange={handleChange}
          value={value}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <input type="submit" hidden />
      </form>
    </header>
  );
};
