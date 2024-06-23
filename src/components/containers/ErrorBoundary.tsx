import React, { ErrorInfo } from 'react';
import Page500 from '../modules/Page500';

class ErrorBoundary extends React.Component<any, any> {
  state = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  // A fake logging service.
  logErrorToServices = console.log;

  render() {
    if (this.state.errorMessage) {
      return <Page500 errorMessage={this.state.errorMessage} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
