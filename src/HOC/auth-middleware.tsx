import React, { Component, ElementType } from 'react';
import { Redirect } from 'react-router';
import Axios, { AxiosResponse } from 'axios';
import { getAccessInformation, destroyAccessInformation } from '../config';
import { validateTokenRequest } from '../requests';
import { routes } from '../routes';
import { Loading } from '../components/Loading/Loading';

export interface AuthMiddlewareState<U> {
  loading: boolean;
  redirect: string;
  authenticatedUser: U;
}

/* eslint-disable react/jsx-props-no-spreading */
export const authMiddleware = <U extends {}>(WrapperComponent: ElementType) =>
  class AuthMiddleware extends Component<any, AuthMiddlewareState<U>> {
    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
        redirect: '',
        authenticatedUser: {} as U,
      };
    }

    componentDidMount(): Promise<any> {
      let localAccessToken: string;
      return getAccessInformation()
        .then(({ accessToken, userId }) => {
          localAccessToken = accessToken;
          return validateTokenRequest(userId, accessToken);
        })
        .then((r: AxiosResponse) => this.setState({ authenticatedUser: r.data }))
        .then(() => {
          Axios.defaults.headers.common.Authorization = localAccessToken;
          this.setState({ loading: false });
        })
        .catch(() => {
          destroyAccessInformation().then(() => this.setState({ redirect: routes.LOGIN }));
        });
    }

    render(): JSX.Element {
      const { loading, redirect, authenticatedUser } = this.state;
      if (redirect) return <Redirect to={redirect} />;
      if (loading) return <Loading centeredVertical />;
      return <WrapperComponent {...this.props} authenticatedUser={authenticatedUser} />;
    }
  };
