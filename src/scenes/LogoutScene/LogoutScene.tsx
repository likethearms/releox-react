import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { getAccessInformation } from '../../config';
import { apis } from '../../apis';
import { routes } from '../../routes';
import { Loading } from '../../components/Loading/Loading';

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
      .then(({ accessToken }) => Axios
        .post(apis.LOGOUT, undefined, { params: { access_token: accessToken } }))
      .then(this.afterRequest.bind(this))
      .catch(this.afterRequest.bind(this));
  }

  afterRequest(): void {
    localStorage.clear();
    this.setState({ redirect: routes.LOGIN });
  }

  render(): JSX.Element {
    const { redirect } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    return <Loading centeredVertical />;
  }
}
