import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import type { Maybe } from '../../../libs/utils/types';
import { ErrorBoundaryFallbackComponent } from './Fallback';

interface Props {
  children?: ReactNode;
}

interface State {
  error: Maybe<Error>;
  info: Maybe<ErrorInfo>;
}

export class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
    // eslint-disable-next-line react/no-unused-state
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ error, info });
  }

  render(): ReactNode {
    const { children } = this.props;
    const { error } = this.state;

    return error ? <ErrorBoundaryFallbackComponent /> : children;
  }
}
