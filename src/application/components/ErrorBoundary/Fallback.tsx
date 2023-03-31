import * as styles from './Fallback.module.css';

export const ErrorBoundaryFallbackComponent = (): JSX.Element => (
  <div className={styles.layout}>
    <div className={styles.message}>Something Error Ooccurring 😞</div>
  </div>
);
