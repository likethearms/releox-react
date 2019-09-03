import React, { Component, ElementType } from 'react';
import { Redirect } from 'react-router';
import { getAccessInformation } from '../config';
import URL from '../routes';
import Loading from '../components/Loading/Loading';

interface MiddlewareState {
  loading: boolean;
  redirect: string;
}

/* eslint-disable react/jsx-props-no-spreading */
const guestMiddleware = (WrapperComponent: ElementType) => (
  class Middleware extends Component<void, MiddlewareState> {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: '',
      };
    }

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
  });


export default guestMiddleware;
