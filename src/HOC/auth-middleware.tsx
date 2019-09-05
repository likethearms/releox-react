import React, { Component, ElementType } from 'react';
import { Redirect } from 'react-router';
import Axios, { AxiosResponse } from 'axios';
import { getAccessInformation, destroyAccessInformation, AccessInformation } from '../config';
import validateTokenRequest from '../requests';
import URL from '../routes';
import Loading from '../components/Loading/Loading';

interface MiddlewareState<U> {
  loading: boolean;
  redirect: string;
  authenticatedUse: U;
}

/* eslint-disable react/jsx-props-no-spreading */
const authMiddleware = <U extends {}>(WrapperComponent: ElementType) => (
  class AuthMiddleware extends Component<any, MiddlewareState<U>> {
    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
        redirect: '',
        authenticatedUse: {} as U,
      };
    }

    componentDidMount(): void {
      let i: AccessInformation;
      getAccessInformation()
        .then((info) => {
          i = info;
          return validateTokenRequest(info.accessToken, info.userId);
        })
        .then((r: AxiosResponse) => this.setState({ authenticatedUse: r.data }))
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
      const { loading, redirect, authenticatedUse } = this.state;
      if (redirect) return <Redirect to={redirect} />;
      if (loading) return <Loading centeredVertical />;
      return <WrapperComponent {...this.props} authenticatedUse={authenticatedUse} />;
    }
  });

export default authMiddleware;
