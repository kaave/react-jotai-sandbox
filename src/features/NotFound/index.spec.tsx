import { screen, render } from '@testing-library/react';

import { NotFound } from '.';

test('<NotFound /> should render Page Not Found message', () => {
  render(<NotFound />);
  expect(screen.getByText('Page Not Found')).toBeInTheDocument();
});
