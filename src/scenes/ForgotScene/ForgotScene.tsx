import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import CenterContent from '../../components/CenterContent/CenterContent';
import Loading from '../../components/Loading/Loading';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';
import Card from '../../components/Card/Card';
import CardTitle from '../../components/CardTitle/CardTitle';
import { URL } from '../../routes';
import { getErrorMessage } from '../../config';
import Input from '../../components/Input/Input';
import Button, { ButtonType } from '../../components/Button/Button';

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
  titleText?: string;
  backLinkText?: string;
  backLink?: string;
  submitText?: string;
  placeholder?: string;
  subTitleText?: string;
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

interface FormBody {
  email: string;
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
      titleText, subTitleText, placeholder, backLinkText, submitText, backLink,
    } = this.props;
    const locale = this.props.locale as string;
    if (loading) return <Loading centeredVertical />;
    if (redirect) return <Redirect to={redirect} />;
    return (
      <CenterContent>
        <div className="col-6" id={CONTEXT}>
          <Card>
            <CardTitle>{titleText || translation[locale].title}</CardTitle>
            <p className="text-muted">{subTitleText || translation[locale].subTitle}</p>
            <FormikFormWrapper<FormBody>
              onSubmit={this.onSubmit.bind(this)}
              initialValues={{ email: '' }}>
              <div>
                <Input
                  name="email"
                  label={placeholder || translation[locale].placeholder}
                  id={`${CONTEXT}-email-input`}
                />
                <Button
                  className="float-right"
                  type={ButtonType.SUBMIT}
                  id={`${CONTEXT}-login-button`}>
                  {submitText || translation[locale].submitText}
                </Button>
                <Link
                  to={backLink as string}
                  id={`${CONTEXT}-back-link`}>
                  {backLinkText || translation[locale].backLinkText}
                </Link>
                <div className="text-center">{message}</div>
              </div>
            </FormikFormWrapper>
          </Card>
        </div>
      </CenterContent>
    );
  }
}

export default ForgotScene;
