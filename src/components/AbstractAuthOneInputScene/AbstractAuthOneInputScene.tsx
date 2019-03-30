import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { Redirect } from 'react-router-dom';
import { InputTypes } from '../Input/Input';
import AuthLayout, { AuthLayoutLinkItem } from '../AuthLayout/AuthLayout';
import AuthForm from '../AuthForm/AuthForm';

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
  locale?: string;
  onError?: (error: Error) => void;
}

export interface AbstractAuthOneInputSceneTranslation {
  placeholder: string;
  buttonText: string;
  title: string;
  subTitle: string;
}

abstract class AbstractAuthOneInputScene<Data, Prop>
  extends Component<Prop & { [key: string]: string }, State> {
  state: State = {
    loading: true,
    message: '',
    redirect: '',
  };

  abstract getContext(): string;
  abstract getInputProps(): AbstractAuthOneInputSceneInputProps;
  abstract getInitValues(): Data;
  abstract onSubmit(body: Data): void;
  abstract getTranslation(): any;
  abstract getLinks(): AuthLayoutLinkItem[];

  getText(key: string): string {
    const locale = this.props.locale;
    const trans = this.getTranslation()[locale][key];
    const prop = this.props[key];
    return prop || trans;
  }

  getForm(): JSX.Element {
    return (
      <AuthForm<Data>
        placeholder={this.getText('placeholder')}
        initialValues={this.getInitValues()}
        buttonText={this.getText('buttonText')}
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
    return (
      <AuthLayout
        context={this.getContext()}
        message={message}
        links={this.getLinks()}
        title={this.getText('title')}
        subTitle={this.getText('subTitle')}>
        {this.getForm()}
      </AuthLayout>
    );
  }
}

export default AbstractAuthOneInputScene;
