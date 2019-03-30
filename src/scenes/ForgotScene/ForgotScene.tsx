import React, { Component } from 'react';
import axios from 'axios';
import CenterContent from '../../components/CenterContent/CenterContent';
import Loading from '../../components/Loading/Loading';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';
import Card from '../../components/Card/Card';
import CardTitle from '../../components/CardTitle/CardTitle';
import { Redirect, Link } from 'react-router-dom';
import { URL } from '../../routes';
import { getErrorMessage } from '../../config';
import Input from '../../components/Input/Input';
import Button, { ButtonType } from '../../components/Button/Button';
import AuthLayout from '../../components/AuthLayout/AuthLayout';

const translation: { [key: string]: any } = {
  fi: {
    submitText: 'Nollaa',
    backLinkText: 'Takaisin kirjautumissivulle',
    title: 'Nolla salasana',
    subTitle: 'Kirjoita sähköpostiosoitteesi niin '
      + 'lähetämme sinulle linkin jolla voit vaihtaa salasanasi.',
    placeholder: 'Sähköposti',
  },
  en: {
    buttonText: 'Reset',
    backLinkText: 'Back to login',
    title: 'Reset your password',
    subTitle: 'Please write your email and we send you password reset link.',
    placeholder: 'Email',
  },
};

export interface ForgotSceneProps {
  passwordResetAPIUrl?: string;
  locale?: string;
  onError?: (err: Error) => void;
  title?: string;
  subTitle?: string;
  backLinkText?: string;
  backLink?: string;
  submitText?: string;
  placeholder?: string;
}

interface FormBody {
  email: string;
}

interface DefaultProps {
  locale: string;
  backLink: string;
  passwordResetAPIUrl: string;
}

interface State {
  loading: boolean;
  message: string;
  redirect: string;
}

const CONTEXT = 'ForgotScene';

class ForgotScene extends Component<ForgotSceneProps, State> {
  state: State = {
    loading: false,
    message: '',
    redirect: '',
  };

  public static defaultProps: DefaultProps = {
    locale: 'fi',
    backLink: URL.LOGIN,
    passwordResetAPIUrl: `${window.API_ENDPOINT}/Members/reset`,
  };


  onSubmit(body: FormBody): void {
    const passwordResetAPIUrl = this.props.passwordResetAPIUrl as string;
    const { onError } = this.props;
    axios
      .post(passwordResetAPIUrl, body)
      .then(() => this.setState({ redirect: URL.FORGOT_SUCCESS }))
      .catch((e) => {
        if (onError) return onError(e);
        this.setState({ message: getErrorMessage(e) });
      });
  }

  render(): JSX.Element {
    const { loading, redirect, message } = this.state;
    const {
      title, subTitle, placeholder, backLinkText, submitText, backLink,
    } = this.props;
    const locale = this.props.locale as string;
    if (loading) return <Loading centeredVertical />;
    if (redirect) return <Redirect to={redirect} />;

    const links = [
      {
        id: 'back-link',
        to: backLink as string,
        text: backLinkText || translation[locale].backLinkText,
      },
    ];

    return (
      <AuthLayout
        context={CONTEXT}
        message={message}
        links={links}
        title={title || translation[locale].title}
        subTitle={subTitle || translation[locale].subTitle}>

      </AuthLayout>
    );
  }
}

export default ForgotScene;
