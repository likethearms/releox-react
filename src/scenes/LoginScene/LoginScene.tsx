import React, { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { Redirect } from 'react-router-dom';
import { saveAccessInformation, getErrorMessage, getReleoxOptions } from '../../config';
import { routes } from '../../routes';
import { AuthLayoutLinkItem, AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { loginRequest } from '../../requests';
import { LoginForm } from '../../scene-forms/LoginForm';

const CONTEXT = 'LoginScene';

export interface LoginSceneProps {
  onSubmit?: (body: LoginBody) => Promise<void>;
  onError?: (err: Error) => void;
  titleBlock?: string | JSX.Element;
  loginFieldName: LoginFieldName;
  showForgotPasswordLink: boolean;
}

export interface LoginBody {
  password: string;
  [key: string]: string;
}

type LoginFieldName = 'username' | 'email';

export const LoginSceneComponent = (props: LoginSceneProps) => {
  const { titleBlock, loginFieldName, onError, onSubmit, showForgotPasswordLink } = props;

  const [redirect, setRedirect] = useState('');
  const [message, setMessage] = useState('');

  const { t } = useTranslation('LoginScene');

  const submit = (body: LoginBody): Promise<void> => {
    setMessage('');
    if (onSubmit) return onSubmit(body);
    return loginRequest(body)
      .then((r: AxiosResponse) => saveAccessInformation(r.data.id, r.data.userId))
      .then(() => setRedirect(routes.HOME))
      .catch((e) => {
        if (onError) return onError(e);
        return setMessage(getErrorMessage(e));
      });
  };

  const getLinks = (): AuthLayoutLinkItem[] => {
    const links = [];
    if (showForgotPasswordLink) {
      links.push({
        to: routes.FORGOT,
        id: `${CONTEXT}-forgot-link`,
        text: t('forgotPassword'),
      });
    }
    if (getReleoxOptions().showRegisterLink) {
      links.push({
        to: routes.REGISTER,
        id: `${CONTEXT}-register-link`,
        text: t('register'),
      });
    }
    return links;
  };

  const initFormValues = { [loginFieldName]: '', password: '' };

  if (redirect) return <Redirect to={redirect} />;
  return (
    <AuthLayout titleBlock={titleBlock} context={CONTEXT} links={getLinks()}>
      <Formik initialValues={initFormValues} onSubmit={submit}>
        {() => <LoginForm loginFieldName={loginFieldName} context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};

LoginSceneComponent.defaultProps = {
  loginFieldName: 'email',
  showForgotPasswordLink: true,
};

export const LoginScene = LoginSceneComponent;
