import React, { Component, ElementType } from 'react';
import { Redirect } from 'react-router';
import { getAccessInformation } from '../config';
import { routes } from '../routes';
import { Loading } from '../components/Loading/Loading';

export interface GuestMiddlewareState {
  loading: boolean;
  redirect: string;
}

/* eslint-disable react/jsx-props-no-spreading */
export const guestMiddleware = (WrapperComponent: ElementType) => (
  class Middleware extends Component<void, GuestMiddlewareState> {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: '',
      };
    }

    componentDidMount(): void {
      getAccessInformation()
        .then(() => this.setState({ loading: false, redirect: routes.HOME }))
        .catch(() => this.setState({ loading: false }));
    }

    render(): JSX.Element {
      const { loading, redirect } = this.state;
      if (redirect) return <Redirect to={redirect} />;
      if (loading) return <Loading centeredVertical />;
      return <WrapperComponent {...this.props} />;
    }
  });
