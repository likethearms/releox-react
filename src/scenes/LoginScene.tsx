import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import CenterContent from '../components/CenterContent/CenterContent';
import Card from '../components/Card/Card';
import CardTitle from '../components/CardTitle/CardTitle';
import FormikFormWrapper from '../components/FormikFormWrapper/FormikFormWrapper';
import Input, { InputTypes } from '../components/Input/Input';
import Button, { ButtonType } from '../components/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { getApiUrl, saveAccessInformation, getErrorMessage } from '../config';

export enum ReleoxLocale {
  FI = 'fi',
  EN = 'en',
}

export interface LoginSceneProps {
  titleText?: string;
  subTitleText?: string;
  forgotPasswordText?: string;
  registerText?: string;
  registerUrl?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  loginButtonText?: string;
  postUrl?: string;
  onSubmit?: (body: LoginBody) => void;
  onError?: (err: Error) => void;
  redirectUrl?: string;
  forgotPasswordUrl?: string;
  email?: string;
  password?: string;
  locale: ReleoxLocale;
}

interface LoginSceneState {
  redirect: string;
  message: string;
}

const translation: { [key: string]: any } = {
  fi: {
    title: 'Kirjaudu',
    subTitle: 'Täytä tiedot ja kirjaudu sisään',
    emailPlaceholder: 'Sähköposti',
    passwordPlaceholder: 'Salasana',
    forgotPasswordText: 'Unohditko salasanasi?',
    registerText: 'Oletko uusi? Luo tunnus!',
    loginButtonText: 'Kirjaudu',
  },
  en: {
    title: 'Login',
    subTitle: 'Fill form and login',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    forgotPasswordText: 'Forgot password?',
    registerText: 'New? Create new account!',
    loginButtonText: 'Login',
  },
};

interface LoginSceneDefaultProps {
  email: string;
  password: string;
  postUrl: string;
  redirectUrl: string;
  forgotPasswordUrl: string;
  locale: ReleoxLocale;
}

interface LoginBody {
  password: string;
  email: string;
}

const CONTEXT = 'LoginScene';

class LoginScene extends Component<LoginSceneProps, LoginSceneState> {
  public static defaultProps: LoginSceneDefaultProps = {
    locale: ReleoxLocale.FI,
    postUrl: `${getApiUrl()}/Member/login`,
    redirectUrl: '/',
    forgotPasswordUrl: '/forgot',
    email: '',
    password: '',
  };

  state: LoginSceneState = {
    redirect: '',
    message: '',
  };

  onSubmit(body: LoginBody): Promise<void> | void {
    const { onSubmit, onError } = this.props;
    const url = this.props.postUrl as string;
    const redirect = this.props.redirectUrl as string;
    if (onSubmit) return onSubmit(body);
    return Axios
      .post(url, body)
      .then((r: AxiosResponse) => saveAccessInformation(r.data.id, r.data.userId))
      .then(() => this.setState({ redirect }))
      .catch((e) => {
        if (onError) return onError(e);
        this.setState({ message: getErrorMessage(e) });
      });
  }

  render(): JSX.Element {
    const {
      titleText, locale, subTitleText, emailPlaceholder, passwordPlaceholder, loginButtonText,
      forgotPasswordText, registerText, registerUrl,
    } = this.props;
    const { redirect, message } = this.state;
    const email = this.props.email as string;
    const password = this.props.password as string;
    if (redirect) return <Redirect to={redirect} />;
    return (
      <CenterContent>
        <div className="col-6" id={CONTEXT}>
          <Card>
            <CardTitle>{titleText || translation[locale].title}</CardTitle>
            <p className="text-muted">{subTitleText || translation[locale].subTitle}</p>
            <FormikFormWrapper<LoginBody>
              initialValues={{ email, password }}
              onSubmit={this.onSubmit.bind(this)}>
              <div>
                <Input
                  name="email"
                  label={emailPlaceholder || translation[locale].emailPlaceholder}
                  id={`${CONTEXT}-email-input`}
                />
                <Input
                  name="password"
                  type={InputTypes.PASSWORD}
                  label={passwordPlaceholder || translation[locale].passwordPlaceholder}
                  id={`${CONTEXT}-password-input`}
                />
                <Button
                  className="float-right"
                  type={ButtonType.SUBMIT}
                  id={`${CONTEXT}-login-button`}>
                  {loginButtonText || translation[locale].loginButtonText}
                </Button>
                <Link
                  to="/forgot"
                  id={`${CONTEXT}-forgot-link`}>
                  {forgotPasswordText || translation[locale].forgotPasswordText}
                </Link>
                {registerUrl ? (
                  <Link
                    to={registerUrl}
                    id={`${CONTEXT}-register-link`}>
                    {registerText || translation[locale].registerText}</Link>
                ) : undefined}
                <div className="text-center">{message}</div>
              </div>
            </FormikFormWrapper>
          </Card>
        </div>
      </CenterContent>
    );
  }
}

export default LoginScene;
