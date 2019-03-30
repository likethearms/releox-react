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
import apis from '../../apis';
import { validateTokenRequest } from '../../requests';
import parseParams from '../../parse-params';

interface Translation {
  [key: string]: AbstractAuthOneInputSceneTranslation;
}

const translation: Translation = {
  fi: {
    title: 'Aseta uusi salasana',
    subTitle: 'Kirjoita uusi salasana ja paina tallenna',
    placeholder: 'Salasana',
    buttonText: 'Tallenna',
  },
  en: {
    title: 'Set new password',
    subTitle: 'Write new password and click save!',
    placeholder: 'Password',
    buttonText: 'Save',
  },
};

interface BodyData {
  password: string;
}

interface DefaultProps {
  locale: string;
  resetPasswordAPIUrl: string;
  removeAccessTokenUrl: string;
}

const CONTEXT = 'ForgotScene';

class ResetPasswordScene
  extends AbstractAuthOneInputScene<BodyData, AbstractAuthOneInputSceneProps>{
  public static defaultProps: DefaultProps = {
    locale: 'fi',
    resetPasswordAPIUrl: apis.PASSWORD_RESET,
    removeAccessTokenUrl: apis.LOGOUT,
  };

  componentWillMount(): void {
    parseParams()
      .then(({ user, access_token }) => validateTokenRequest(access_token, user))
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ redirect: URL.ERROR }));
  }

  onSubmit(body: BodyData): void {
    const { onError, resetPasswordAPIUrl } = this.props;
    Axios
      .post(resetPasswordAPIUrl, body)
      .then(() => this.setState({ redirect: URL.FORGOT_SUCCESS }))
      .catch((e) => {
        if (onError) return onError(e);
        this.setState({ message: getErrorMessage(e) });
      });
  }

  getInitValues(): BodyData {
    return { password: '' };
  }

  getInputProps(): AbstractAuthOneInputSceneInputProps {
    return {
      name: 'password',
      type: InputTypes.PASSWORD,
    };
  }

  getLinks(): AuthLayoutLinkItem[] {
    return [];
  }

  getContext(): string {
    return CONTEXT;
  }

  getTranslation(): any {
    return translation;
  }
}

export default ResetPasswordScene;
