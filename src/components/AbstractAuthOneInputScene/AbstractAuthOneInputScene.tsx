import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { Redirect } from 'react-router-dom';
import { InputTypes } from '../Input/Input';
import AuthLayout, { AuthLayoutLinkItem } from '../AuthLayout/AuthLayout';
import AuthForm from '../AuthForm/AuthForm';
import { ct, ReleoxLocale } from '../../I18N';
import Axios, { AxiosError } from 'axios';
import { getErrorMessage } from '../../config';

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
  abstract onSubmit(body: Data): void;
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

  onSubmitMethod<T>(url: string, body: T, redirect: string): void {
    Axios.post(url, body)
      .then(() => this.setState({ redirect }))
      .catch(this.onErrorMethod.bind(this));
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
    if (loading) return <Loading centeredVertical />;
    if (redirect) return <Redirect to={redirect} />;
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
