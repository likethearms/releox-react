import React from 'react';
import { URL } from '../../routes';
import { InputTypes } from '../../components/Input/Input';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import Axios from 'axios';
import { getErrorMessage } from '../../config';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneTranslation,
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';

interface Translation {
  [key: string]: AbstractAuthOneInputSceneTranslation & { backLinkText: string };
}

const translation: Translation = {
  fi: {
    buttonText: 'Nollaa',
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

interface BodyData {
  email: string;
}

interface DefaultProps {
  locale: string;
  passwordResetAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

class ForgotScene extends AbstractAuthOneInputScene<BodyData, AbstractAuthOneInputSceneProps>{
  public static defaultProps: DefaultProps = {
    locale: 'fi',
    passwordResetAPIUrl: `${window.API_ENDPOINT}/Members/reset`,
  };

  onSubmit(body: BodyData): void {
    const passwordResetAPIUrl = this.props.passwordResetAPIUrl as string;
    const { onError } = this.props;
    Axios
      .post(passwordResetAPIUrl, body)
      .then(() => this.setState({ redirect: URL.FORGOT_SUCCESS }))
      .catch((e) => {
        if (onError) return onError(e);
        this.setState({ message: getErrorMessage(e) });
      });
  }

  getInitValues(): BodyData {
    return { email: '' };
  }

  getInputProps(): AbstractAuthOneInputSceneInputProps {
    return {
      name: 'email',
      type: InputTypes.EMAIL,
    };
  }

  getLinks(): AuthLayoutLinkItem[] {
    const { backLinkText } = this.props;
    const locale = this.props.locale as string;
    return [
      {
        id: 'back-link',
        to: URL.LOGIN,
        text: backLinkText || translation[locale].backLinkText,
      },
    ];
  }

  getContext(): string {
    return CONTEXT;
  }

  getTranslation(): any {
    return translation;
  }
}

export default ForgotScene;
