import React, { Component } from 'react';
import queryString from 'query-string';
import { AxiosError } from 'axios';
import { Redirect } from 'react-router';
import { successScene, SuccessSceneProps } from '../../HOC/success-scene';
import { routes } from '../../routes';
import { getErrorMessage } from '../../config';
import { Loading } from '../../components/Loading/Loading';
import { confirmUserRequest } from '../../requests';

export interface ConfirmSceneProps { }
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
  }

  componentDidMount(): any {
    const query = queryString.parse(window.location.search);

    if (!query.uid || !query.token) return this.redirectError('Missing information');
    if (Array.isArray(query.uid) || Array.isArray(query.token)) return this.redirectError('Information is on wrong format');

    return confirmUserRequest(query.uid, query.token)
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) => this.redirectError(getErrorMessage(e)));
  }

  redirectError(message: string): void {
    this.setState({
      redirect: `${routes.ERROR}?message=${message}`,
    });
  }

  render(): JSX.Element {
    const { locale } = this.props;
    const { redirect, loading } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    if (loading) return <Loading centeredVertical />;
    return successScene('ConfirmScene', 'confirm', routes.LOGIN)({ locale });
  }
}
