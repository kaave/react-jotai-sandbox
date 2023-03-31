/* eslint-disable react/jsx-no-bind */
import type { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import * as styles from './index.module.css';

type Props = {
  id: string;
  bodyText: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onChangeText: (id: string, value: string) => void;
  onRemove: (id: string) => void;
};

export const Item = ({ id, bodyText, completed, onToggle, onChangeText, onRemove }: Props): JSX.Element => {
  const editInput = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [temporaryName, setTemporaryName] = useState(bodyText);
  const onClick = useCallback(() => setEditing(true), []);

  const blurEditHandler: FocusEventHandler<HTMLInputElement> = (): void => {
    setEditing(false);
    setTemporaryName(bodyText);
  };

  const toggleHandler = useCallback(() => onToggle(id), [id, onToggle]);
  const clickRemoveButtonHandler = useCallback(() => onRemove(id), [id, onRemove]);
  const changeTextHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setTemporaryName(event.currentTarget.value),
    [],
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      setEditing(false);

      if (temporaryName.length > 0) {
        onChangeText(id, temporaryName);
      } else {
        onRemove(id);
      }
    },
    [id, onChangeText, onRemove, temporaryName],
  );

  useEffect(() => {
    // For fucus input element when double clicks text label. fix this https://github.com/laststance/create-react-app-typescript-todo-example-2021/issues/50
    if (editing && editInput.current !== null) editInput.current.focus();
  }, [editInput, editing]);

  return (
    <div className={styles.root}>
      <li className={`${completed ? styles.completed : ''} ${editing ? styles.editing : ''}`}>
        <div className={styles.view}>
          <input className={styles.toggle} type="checkbox" checked={completed} onChange={toggleHandler} />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <label onDoubleClick={onClick}>{bodyText}</label>
          <button type="button" className={styles.destroy} onClick={clickRemoveButtonHandler} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            ref={editInput}
            className={styles.edit}
            value={temporaryName}
            onChange={changeTextHandler}
            onBlur={blurEditHandler}
          />
          <input type="submit" hidden />
        </form>
      </li>
    </div>
  );
};
