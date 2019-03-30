import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { Redirect } from 'react-router-dom';
import { InputTypes } from '../Input/Input';
import AuthLayout, { AuthLayoutLinkItem } from '../AuthLayout/AuthLayout';
import AuthForm from '../AuthForm/AuthForm';
import { ct, ReleoxLocale } from '../../I18N';
import Axios, { AxiosError } from 'axios';
import { getErrorMessage } from '../../config';
import { URL } from '../../routes';
import apis from '../../apis';
import parseParams from '../../parse-params';

interface State {
  loading: boolean;
  message: string;
  redirect: string;
}

export interface AbstractAuthOneInputSceneInputProps {
  name: string;
  type: InputTypes;
}

export interface AbstractAuthOneInputSceneProps {
  buttonText?: string;
  title?: string;
  locale?: ReleoxLocale;
  onError?: (error: AxiosError) => void;
}

export interface AbstractAuthOneInputSceneTranslation {
  placeholder: string;
  buttonText: string;
  title: string;
  subTitle: string;
}

abstract class AbstractAuthOneInputScene<Data, Prop>
  extends Component<Prop & AbstractAuthOneInputSceneProps, State> {
  state: State = {
    loading: true,
    message: '',
    redirect: '',
  };

  abstract getContext(): string;
  abstract getInputProps(): AbstractAuthOneInputSceneInputProps;
  abstract getInitValues(): Data;
  abstract getPostUrl(): string;
  abstract getRedirectUrl(): string;
  abstract getTPrefix(): string;
  abstract getLinks(): AuthLayoutLinkItem[];

  getT(): (key: string) => string {
    const { locale } = this.props;
    return ct(this.getTPrefix(), locale);
  }

  onErrorMethod(error: AxiosError): any {
    const { onError } = this.props;
    if (onError) return onError(error);
    this.setState({ message: getErrorMessage(error) });
  }

  shouldDestroyToken(): boolean {
    return false;
  }

  destroyToken(redirect: string): void {
    parseParams()
      .then(({ access_token }) => Axios.post(`${apis.LOGOUT}?access_token=${access_token}`))
      .then(() => this.setState({ redirect }))
      .catch(this.onErrorMethod.bind(this));
  }

  onSubmitMethod(url: string, body: Data, redirect: string): void {
    let u = url;
    parseParams()
      .then(({ access_token }) => {
        if (access_token) u = `${url}?access_token=${access_token}`;
        Axios.post(u, body)
          .then(() => {
            if (!this.shouldDestroyToken()) return this.setState({ redirect });
            this.destroyToken(redirect);
          })
          .catch(this.onErrorMethod.bind(this));
      });
  }

  onSubmit(body: Data): void {
    this.onSubmitMethod(this.getPostUrl(), body, this.getRedirectUrl());
  }

  getForm(): JSX.Element {
    const t = this.getT();
    return (
      <AuthForm<Data>
        placeholder={t('placeholder')}
        initialValues={this.getInitValues()}
        buttonText={t('buttonText')}
        context={this.getContext()}
        onSubmit={this.onSubmit.bind(this)}
        inputProps={this.getInputProps()}
      />
    );
  }

  render(): JSX.Element {
    const { loading, redirect, message } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    if (loading) return <Loading centeredVertical />;
    const t = this.getT();
    return (
      <AuthLayout
        context={this.getContext()}
        message={message}
        links={this.getLinks()}
        title={t('title')}
        subTitle={t('subTitle')}>
        {this.getForm()}
      </AuthLayout>
    );
  }
}

export default AbstractAuthOneInputScene;
