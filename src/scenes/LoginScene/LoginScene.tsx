import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';
import Input, { InputTypes } from '../../components/Input/Input';
import Button, { ButtonType } from '../../components/Button/Button';
import { Redirect } from 'react-router-dom';
import { saveAccessInformation, getErrorMessage } from '../../config';
import { URL } from '../../routes';
import { ct, ReleoxLocale } from '../../I18N';
import AuthLayout, { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import apis from '../../apis';

export interface LoginSceneProps {
  onSubmit?: (body: LoginBody) => void;
  onError?: (err: Error) => void;
  showRegisterLink?: boolean;
  locale?: ReleoxLocale;
}

interface LoginSceneState {
  redirect: string;
  message: string;
}

interface LoginBody {
  password: string;
  email: string;
}

const CONTEXT = 'LoginScene';

class LoginScene extends Component<LoginSceneProps, LoginSceneState> {
  state: LoginSceneState = {
    redirect: '',
    message: '',
  };

  onSubmit(body: LoginBody): Promise<void> | void {
    const { onSubmit, onError } = this.props;
    if (onSubmit) return onSubmit(body);
    return Axios
      .post(apis.LOGIN, body)
      .then((r: AxiosResponse) => saveAccessInformation(r.data.id, r.data.userId))
      .then(() => this.setState({ redirect: URL.HOME }))
      .catch((e) => {
        if (onError) return onError(e);
        this.setState({ message: getErrorMessage(e) });
      });
  }

  getLinks(): AuthLayoutLinkItem[] {
    const { locale, showRegisterLink } = this.props;
    const t = ct('login', locale);
    const links = [
      {
        to: URL.FORGOT,
        id: `${CONTEXT}-forgot-link`,
        text: t('forgotPasswordText'),
      },
    ];
    if (showRegisterLink) {
      links.push({
        to: URL.REGISTER,
        id: `${CONTEXT}-register-link`,
        text: t('registerText'),
      });
    }
    return links;
  }

  render(): JSX.Element {
    const { locale } = this.props;
    const { redirect, message } = this.state;
    if (redirect) return <Redirect to={redirect} />;
    const t = ct('login', locale);
    return (
      <AuthLayout
        title={t('title')}
        subTitle={t('subTitle')}
        context={CONTEXT}
        links={this.getLinks()}>
        <FormikFormWrapper<LoginBody>
          initialValues={{ email: '', password: '' }}
          onSubmit={this.onSubmit.bind(this)}>
          <div>
            <Input
              name="email"
              label={t('emailPlaceholder')}
              id={`${CONTEXT}-email-input`}
            />
            <Input
              name="password"
              type={InputTypes.PASSWORD}
              label={t('passwordPlaceholder')}
              id={`${CONTEXT}-password-input`}
            />
            <Button
              className="float-right"
              type={ButtonType.SUBMIT}
              id={`${CONTEXT}-login-button`}>
              {t('loginButtonText')}
            </Button>
            <div className="text-center">{message}</div>
          </div>
        </FormikFormWrapper>
      </AuthLayout>
    );
  }
}

export default LoginScene;
