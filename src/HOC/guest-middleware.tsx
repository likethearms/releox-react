import React, { Component, ComponentType } from 'react';
import { Redirect } from 'react-router';
import { getAccessInformation } from '../config';
import { routes } from '../routes';
import { Loading } from '../components/Loading/Loading';

export interface GuestMiddlewareState {
  loading: boolean;
  redirect: string;
}

/* eslint-disable react/jsx-props-no-spreading */
export const guestMiddleware = <P extends {}>(WrapperComponent: ComponentType<P>) =>
  class GuestMiddleware extends Component<P, GuestMiddlewareState> {
    constructor(props: P) {
      super(props);
      this.state = {
        loading: true,
        redirect: '',
      };
    }

    componentDidMount(): Promise<any> {
      return getAccessInformation()
        .then(() => this.setState({ loading: false, redirect: routes.HOME }))
        .catch(() => this.setState({ loading: false }));
    }

    render(): JSX.Element {
      const { loading, redirect } = this.state;
      if (redirect) return <Redirect to={redirect} />;
      if (loading) return <Loading centeredVertical />;
      return <WrapperComponent {...this.props} />;
    }
  };
