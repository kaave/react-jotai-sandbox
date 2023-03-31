import { screen, render } from '@testing-library/react';

import { ErrorBoundary } from '.';

test('should be render fallback page Error was thrown', () => {
  render(
    <ErrorBoundary>
      <InvalidComponent />
    </ErrorBoundary>,
  );

  expect(screen.getByText('Something Error Ooccurring 😞')).toBeInTheDocument();
});

const InvalidComponent = (): JSX.Element => <>{new Date()}</>;
