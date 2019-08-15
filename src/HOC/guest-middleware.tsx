import React, { Component } from 'react';
import { Loading } from '../package-index';
import { getAccessInformation } from '../config';
import { Redirect } from 'react-router';
import { URL } from '../routes';

interface MiddlewareState {
  loading: boolean;
  redirect: string;
}

const guestMiddleware = function (WrapperComponent: any): any {
  return class Middleware extends Component<void, MiddlewareState> {
    state: MiddlewareState = {
      loading: true,
      redirect: '',
    };

    componentDidMount(): void {
      getAccessInformation()
        .then(() => this.setState({ loading: false, redirect: URL.HOME }))
        .catch(() => this.setState({ loading: false }));
    }

    render(): JSX.Element {
      const { loading, redirect } = this.state;
      if (redirect) return <Redirect to={redirect} />;
      if (loading) return <Loading centeredVertical />;
      return <WrapperComponent {...this.props} />;
    }
  };
};

export default guestMiddleware;
