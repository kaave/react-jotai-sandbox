import type { ChangeEventHandler, ComponentProps } from 'react';
import { useState, useCallback } from 'react';
import { Item } from './Item';
import * as styles from './index.module.css';
import type { Todo } from '../../models/Todo';

type ItemProps = ComponentProps<typeof Item>;

type Props = {
  todos: readonly Todo[];
  onRemove: ItemProps['onRemove'];
  onToggle: ItemProps['onToggle'];
  onChangeText: ItemProps['onChangeText'];
  onToggleAll: (checked: boolean) => void;
};

export const TodoList = ({ todos, onRemove, onToggle, onChangeText, onToggleAll }: Props): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const toggleAllCheckbox = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      onToggleAll(checked);
      setChecked(b => !b);
    },
    [onToggleAll],
  );

  return (
    <section className={styles.main}>
      <input
        id="toggle-all"
        className={styles.toggleAll}
        type="checkbox"
        onChange={toggleAllCheckbox}
        checked={checked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className={styles.todoList}>
        {todos.map(({ id, bodyText, completed }) => (
          <Item
            key={id}
            id={id}
            bodyText={bodyText}
            completed={completed}
            onToggle={onToggle}
            onChangeText={onChangeText}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </section>
  );
};
