import { useMemo } from 'react';

export const NotFound = (): JSX.Element => (
  <div
    style={useMemo(
      () => ({
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }),
      [],
    )}
  >
    <h1>Page Not Found</h1>
  </div>
);
