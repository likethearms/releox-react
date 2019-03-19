import React, { Component } from 'react';
import Axios from 'axios';
import CenterContent from '../components/CenterContent/CenterContent';
import Card from '../components/Card/Card';
import CardTitle from '../components/CardTitle/CardTitle';
import FormikFormWrapper from '../components/FormikFormWrapper/FormikFormWrapper';
import Input, { InputTypes } from '../components/Input/Input';
import Button, { ButtonType } from '../components/Button/Button';
import { action } from '@storybook/addon-actions';
import { Link } from 'react-router-dom';

export enum ReleoxLocale {
  FI = 'fi',
  EN = 'en',
}

export interface LoginSceneProps {
  titleText?: string;
  subTitleText?: string;
  forgotPasswordText?: string;
  registerText?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  loginButtonText?: string;
  postUrl?: string;
  email?: string,
  password?: string,
  locale: ReleoxLocale;
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
}

interface LoginSceneDefaultProps {
  email: string;
  password: string;
  postUrl: string;
  locale: ReleoxLocale;
}

interface LoginBody {
  password: string;
  email: string;
}

const CONTEXT = 'LoginScene';

class LoginScene extends Component<LoginSceneProps> {
  public static defaultProps: LoginSceneDefaultProps = {
    locale: ReleoxLocale.FI,
    postUrl: '',
    email: '',
    password: '',
  };

  onSubmit(body: LoginBody) {
    const url = this.props.postUrl as string;
    Axios.post(url, body);
  }

  render() {
    const {
      titleText, locale, subTitleText, emailPlaceholder, passwordPlaceholder, loginButtonText,
      forgotPasswordText, registerText,
    } = this.props;
    const email = this.props.email as string;
    const password = this.props.password as string;
    return (
      <CenterContent>
        <div className="col-6" id={CONTEXT}>
          <Card>
            <CardTitle>{titleText || translation[locale].title}</CardTitle>
            <p className="text-muted">{subTitleText || translation[locale].subTitle}</p>
            <FormikFormWrapper<LoginBody>
              initialValues={{ email, password }}
              onSubmit={action('onSubmit')}>
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
                <Link to="/forgot" id={`${CONTEXT}-forgot-link`}>{forgotPasswordText || translation[locale].forgotPasswordText}</Link>
                <br />
                <Link to="/register" id={`${CONTEXT}-register-link`}>{registerText || translation[locale].registerText}</Link>
              </div>
            </FormikFormWrapper>
          </Card>
        </div>
      </CenterContent>
    );
  }
}

export default LoginScene;
