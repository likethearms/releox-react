import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { Redirect } from 'react-router-dom';
import { URL } from '../../routes';
import { getErrorMessage } from '../../config';
import { InputTypes } from '../../components/Input/Input';
import AuthLayout, { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import AuthForm from '../../components/AuthForm/AuthForm';

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

  getLinks(): AuthLayoutLinkItem[] {
    const { backLinkText, backLink } = this.props;
    const locale = this.props.locale as string;
    return [
      {
        id: 'back-link',
        to: backLink as string,
        text: backLinkText || translation[locale].backLinkText,
      },
    ];
  }

  getForm(): JSX.Element {
    const locale = this.props.locale as string;
    const { placeholder, submitText } = this.props;
    return (
      <AuthForm<FormBody>
        placeholder={placeholder || translation[locale].placeholder}
        initialValues={{ email: '' }}
        buttonText={submitText || translation[locale].submitText}
        context={CONTEXT}
        onSubmit={this.onSubmit.bind(this)}
        inputProps={{
          name: 'email',
          type: InputTypes.EMAIL,
        }}
      />
    );
  }

  render(): JSX.Element {
    const { loading, redirect, message } = this.state;
    const { title, subTitle } = this.props;
    const locale = this.props.locale as string;
    if (loading) return <Loading centeredVertical />;
    if (redirect) return <Redirect to={redirect} />;
    return (
      <AuthLayout
        context={CONTEXT}
        message={message}
        links={this.getLinks()}
        title={title || translation[locale].title}
        subTitle={subTitle || translation[locale].subTitle}>
        {this.getForm()}
      </AuthLayout>
    );
  }
}

export default ForgotScene;
