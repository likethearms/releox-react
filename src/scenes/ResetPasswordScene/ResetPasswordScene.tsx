import { URL } from '../../routes';
import { InputTypes } from '../../components/Input/Input';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import { getErrorMessage } from '../../config';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import apis from '../../apis';
import { validateTokenRequest, resetPasswordRequest } from '../../requests';
import parseParams from '../../parse-params';

interface BodyData {
  newPassword: string;
}

interface DefaultProps {
  resetPasswordAPIUrl: string;
  removeAccessTokenUrl: string;
}

const CONTEXT = 'ForgotScene';

class ResetPasswordScene
  extends AbstractAuthOneInputScene<BodyData, AbstractAuthOneInputSceneProps>{
  public static defaultProps: DefaultProps = {
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
    resetPasswordRequest(resetPasswordAPIUrl, body)
      .then(() => this.setState({ redirect: URL.RESET_SUCCESS }))
      .catch((e) => {
        if (onError) return onError(e);
        this.setState({ message: getErrorMessage(e) });
      });
  }

  getInitValues(): BodyData {
    return { newPassword: '' };
  }

  getInputProps(): AbstractAuthOneInputSceneInputProps {
    return {
      name: 'newPassword',
      type: InputTypes.PASSWORD,
    };
  }

  getLinks(): AuthLayoutLinkItem[] {
    return [];
  }

  getContext(): string {
    return CONTEXT;
  }

  getTPrefix(): any {
    return 'resetPassword';
  }
}

export default ResetPasswordScene;
