import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getAccessInformation } from '../../config';
import apis from '../../apis';
import Axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { URL } from '../../routes';

interface State {
  redirect: string;
}

class LogoutScene extends Component {
  state: State = {
    redirect: '',
  };

  componentWillMount(): void {
    getAccessInformation()
      .then(({ accessToken }) =>
        Axios.post(apis.LOGOUT, undefined, { params: { access_token: accessToken } }))
      .then(this.afterRequest.bind(this))
      .catch(this.afterRequest.bind(this));
  }

  afterRequest(): void {
    localStorage.clear();
    this.setState({ redirect: URL.LOGIN });
  }

  render(): JSX.Element {
    const { redirect } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    return <Loading centeredVertical />;
  }
}

export default LogoutScene;
