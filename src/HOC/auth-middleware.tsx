import React, { Component } from 'react';
import { Loading } from '../package-index';
import { getAccessInformation, destroyAccessInformation, AccessInformation } from '../config';
import { validateTokenRequest } from '../requests';
import { Redirect } from 'react-router';
import { URL } from '../routes';
import Axios, { AxiosResponse } from 'axios';

interface MiddlewareState<U> {
  loading: boolean;
  redirect: string;
  user: U;
}

const authMiddleware = function <U>(WrapperComponent: any): any {
  return class Middleware extends Component<void, MiddlewareState<U>> {
    state: MiddlewareState<U> = {
      loading: true,
      redirect: '',
      user: {} as U,
    };

    componentWillMount(): void {
      let i: AccessInformation;
      getAccessInformation()
        .then((info) => {
          i = info;
          return validateTokenRequest(info.accessToken, info.userId);
        })
        .then((r: AxiosResponse) => this.setState({ user: r.data }))
        .then(() => {
          Axios.defaults.headers.common.Authorization = i.accessToken;
          this.setState({ loading: false });
        })
        .catch(() => {
          destroyAccessInformation()
            .then(() => this.setState({ redirect: URL.LOGIN }));
        });
    }

    render(): JSX.Element {
      const { loading, redirect, user } = this.state;
      if (redirect) return <Redirect to={redirect} />;
      if (loading) return <Loading centeredVertical />;
      return <WrapperComponent {...this.props} user={user} />;
    }
  };
};

export default authMiddleware;
