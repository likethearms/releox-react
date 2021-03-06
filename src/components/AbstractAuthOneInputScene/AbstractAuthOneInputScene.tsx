import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios, { AxiosError } from 'axios';
import { AuthLayoutLinkItem, AuthLayout } from '../AuthLayout/AuthLayout';
import { ct, ReleoxLocale } from '../../I18N';
import { getErrorMessage } from '../../config';
import { apis } from '../../apis';
import { InputTypes } from '../Input/Input';
import { parseParams } from '../../parse-params';
import { AuthForm } from '../AuthForm/AuthForm';
import { Loading } from '../Loading/Loading';

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
}

export interface AbstractAuthOneInputSceneTranslation {
  placeholder: string;
  buttonText: string;
  title: string;
  subTitle: string;
}

/* eslint-disable camelcase */
export abstract class AbstractAuthOneInputScene<Data, Prop>
  extends Component<Prop & AbstractAuthOneInputSceneProps, State> {
  constructor(props: Prop) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      loading: true,
      message: '',
      redirect: '',
    };
  }

  onErrorMethod(error: AxiosError): any {
    return this.setState({ message: getErrorMessage(error) });
  }

  onSubmitMethod(url: string, body: Data, redirect: string): Promise<any> {
    let u = url;
    return parseParams()
      .then(({ access_token }) => {
        if (access_token) u = `${url}?access_token=${access_token}`;
        return Axios.post(u, body);
      })
      .then(() => {
        if (this.shouldDestroyToken()) return this.destroyToken(redirect);
        return new Promise((resolve) => this.setState({ redirect }, resolve));
      })
      .catch((e) => {
        this.onErrorMethod(e);
        return Promise.resolve();
      });
  }

  onSubmit(body: Data): Promise<any> {
    return this.onSubmitMethod(this.getPostUrl(), body, this.getRedirectUrl());
  }

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

  getForm(): JSX.Element {
    const t = this.getT();
    return (
      <AuthForm<Data>
        placeholder={t('placeholder')}
        initialValues={this.getInitValues()}
        buttonText={t('buttonText')}
        context={this.getContext()}
        onSubmit={this.onSubmit}
        inputProps={this.getInputProps()}
      />
    );
  }

  private destroyToken(redirect: string): Promise<any> {
    return parseParams()
      .then(({ access_token }) => Axios.post(`${apis.LOGOUT}?access_token=${access_token}`))
      .then(() => new Promise((resolve) => this.setState({ redirect }, resolve)));
  }

  /* eslint-disable class-methods-use-this */
  shouldDestroyToken(): boolean {
    return false;
  }
  /* eslint-enable class-methods-use-this */

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
        subTitle={t('subTitle')}
      >
        {this.getForm()}
      </AuthLayout>
    );
  }
}
