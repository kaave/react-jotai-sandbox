/* eslint-disable react/forbid-component-props */
import * as styles from './index.module.css';
import { Link } from 'react-router-dom';

type Props = {
  /** 現在の `location.pathname` 。 */
  pathname: string;
  /** Completed な TODO があるか。 */
  hasCompleted: boolean;
  /** Backlog の件数。 */
  backlogCount: number;
  /** `Completed` をクリアするイベントのハンドラー */
  onClearCompleted: () => void;
};

export const UnderBar = ({ pathname, hasCompleted, backlogCount, onClearCompleted }: Props): JSX.Element => (
  <footer className={styles.footer}>
    <span className={styles.todoCount}>
      <strong>{backlogCount}</strong> item{backlogCount > 1 ? 's' : ''} left
    </span>
    <ul className={styles.filters}>
      <li>
        <Link aria-current={pathname === '/' ? 'page' : undefined} to="/">
          All
        </Link>
      </li>
      <li>
        <Link aria-current={pathname === '/active' ? 'page' : undefined} to="/active">
          Active
        </Link>
      </li>
      <li>
        <Link aria-current={pathname === '/completed' ? 'page' : undefined} to="/completed">
          Completed
        </Link>
      </li>
    </ul>
    {hasCompleted ? (
      <button className={styles.clearCompleted} type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    ) : null}
  </footer>
);
