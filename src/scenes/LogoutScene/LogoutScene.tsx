import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { getAccessInformation } from '../../config';
import apis from '../../apis';
import Loading from '../../components/Loading/Loading';
import URL from '../../routes';

interface State {
  redirect: string;
}

interface Props { }

class LogoutScene extends Component<Props, State> {
  constructor(props: Props) {
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
    this.setState({ redirect: URL.LOGIN });
  }

  render(): JSX.Element {
    const { redirect } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    return <Loading centeredVertical />;
  }
}

export default LogoutScene;
