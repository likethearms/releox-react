import React, { Component } from 'react';
import queryString from 'query-string';
import Axios, { AxiosError } from 'axios';
import { Redirect } from 'react-router';
import { successScene, SuccessSceneProps } from '../../HOC/success-scene';
import { routes } from '../../routes';
import { apis } from '../../apis';
import { getErrorMessage } from '../../config';
import { Loading } from '../../components/Loading/Loading';

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

  componentDidMount(): void {
    const query = queryString.parse(window.location.search);
    Axios.get(`${apis.CONFIRM}?uid=${query.uid}&token=${query.token}`)
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) => this.setState({
        redirect: `${routes.ERROR}?message=${getErrorMessage(e)}`,
      }));
  }

  render(): JSX.Element {
    const { locale } = this.props;
    const { redirect, loading } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    if (loading) return <Loading centeredVertical />;
    return successScene('ConfirmScene', 'confirm', routes.LOGIN)({ locale });
  }
}
