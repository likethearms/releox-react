import React, { Component } from 'react';
import queryString from 'query-string';
import { AxiosError } from 'axios';
import { Redirect } from 'react-router';
import { successScene, SuccessSceneProps } from '../../HOC/success-scene';
import { routes } from '../../routes';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { Loading } from '../../components/Loading/Loading';
import { confirmUserRequest } from '../../requests';

export interface ConfirmSceneProps {}
interface State {
  redirect: string;
  loading: boolean;
}

export class ConfirmScene extends Component<ConfirmSceneProps & SuccessSceneProps, State> {
  constructor(props: ConfirmSceneProps) {
    super(props);
    this.state = {
      redirect: '',
      loading: true,
    };
    this.handleAxiosError = this.handleAxiosError.bind(this);
    this.turnLoadingOff = this.turnLoadingOff.bind(this);
  }

  componentDidMount(): any {
    const query = queryString.parse(window.location.search);

    if (!query.uid || !query.token) return this.redirectToAuthErrorPage('Missing information');
    if (Array.isArray(query.uid) || Array.isArray(query.token))
      return this.redirectToAuthErrorPage('Information is on wrong format');

    return confirmUserRequest(query.uid, query.token)
      .then(this.turnLoadingOff)
      .catch(this.handleAxiosError);
  }

  turnLoadingOff(): void {
    this.setState({ loading: false });
  }

  handleAxiosError(e: AxiosError): void {
    this.redirectToAuthErrorPage(getErrorMessage(e));
  }

  redirectToAuthErrorPage(message: string): void {
    this.setState({ redirect: getAuthErrorUrl(message) });
  }

  render(): JSX.Element {
    const { locale } = this.props;
    const { redirect, loading } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    if (loading) return <Loading centeredVertical />;
    return successScene('ConfirmScene', 'confirm', routes.LOGIN)({ locale });
  }
}
