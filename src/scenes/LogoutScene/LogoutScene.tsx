import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getAccessInformation, destroyAccessInformation } from '../../config';
import { routes } from '../../routes';
import { Loading } from '../../components/Loading/Loading';
import { logoutRequest } from '../../requests';

interface State {
  redirect: string;
}

export class LogoutScene extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redirect: '',
    };
  }

  componentDidMount(): void {
    getAccessInformation()
      .then(({ accessToken }) => logoutRequest(accessToken))
      .then(this.afterRequest.bind(this))
      .catch(this.afterRequest.bind(this));
  }

  afterRequest(): void {
    destroyAccessInformation()
      .then(() => this.setState({ redirect: routes.LOGIN }));
  }

  render(): JSX.Element {
    const { redirect } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    return <Loading centeredVertical />;
  }
}
