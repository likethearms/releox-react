import React, { Component } from 'react';
import { AxiosResponse } from 'axios';
import { Redirect } from 'react-router-dom';
import { saveAccessInformation, getErrorMessage, getReleoxOptions } from '../../config';
import { ct, ReleoxLocale } from '../../I18N';
import { routes } from '../../routes';
import { AuthLayoutLinkItem, AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { FormikFormWrapper } from '../../components/FormikFormWrapper/FormikFormWrapper';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { loginRequest } from '../../requests';

interface LoginSceneState {
  redirect: string;
  message: string;
}

const CONTEXT = 'LoginScene';

export interface LoginSceneProps {
  onSubmit?: (body: LoginBody) => Promise<void>;
  onError?: (err: Error) => void;
  locale?: ReleoxLocale;
}

export interface LoginBody {
  password: string;
  email: string;
}

export class LoginScene extends Component<LoginSceneProps, LoginSceneState> {
  constructor(props: LoginSceneProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      redirect: '',
      message: '',
    };
  }

  onSubmit(body: LoginBody): Promise<void> {
    const { onSubmit, onError } = this.props;
    if (onSubmit) return onSubmit(body);
    return loginRequest(body)
      .then((r: AxiosResponse) => saveAccessInformation(r.data.id, r.data.userId))
      .then(() => this.setState({ redirect: routes.HOME }))
      .catch((e) => {
        if (onError) return onError(e);
        return this.setState({ message: getErrorMessage(e) });
      });
  }

  getLinks(): AuthLayoutLinkItem[] {
    const { locale } = this.props;
    const t = ct('login', locale);
    const links = [
      {
        to: routes.FORGOT,
        id: `${CONTEXT}-forgot-link`,
        text: t('forgotPasswordText'),
      },
    ];
    if (getReleoxOptions().showRegisterLink) {
      links.push({
        to: routes.REGISTER,
        id: `${CONTEXT}-register-link`,
        text: t('registerText'),
      });
    }
    return links;
  }

  getT() {
    const { locale } = this.props;
    return ct('login', locale);
  }

  getLoginForm() {
    const { message } = this.state;
    const t = this.getT();
    return (
      <FormikFormWrapper<LoginBody>
        initialValues={{ email: '', password: '' }}
        onSubmit={this.onSubmit}
      >
        <Input name="email" label={t('emailPlaceholder')} id={`${CONTEXT}-email-input`} />
        <Input name="password" type="password" label={t('passwordPlaceholder')} id={`${CONTEXT}-password-input`} />
        <Button className="float-right" type="submit" id={`${CONTEXT}-login-button`}>
          {t('loginButtonText')}
        </Button>
        <div className="text-center">{message}</div>
      </FormikFormWrapper>
    );
  }

  render(): JSX.Element {
    const { redirect } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    const t = this.getT();
    return (
      <AuthLayout
        title={t('title')}
        subTitle={t('subTitle')}
        context={CONTEXT}
        links={this.getLinks()}
      >
        {this.getLoginForm()}
      </AuthLayout>
    );
  }
}
