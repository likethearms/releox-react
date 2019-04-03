import { URL } from '../../routes';
import { InputTypes } from '../../components/Input/Input';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import apis from '../../apis';
import { validateTokenRequest } from '../../requests';
import parseParams from '../../parse-params';
import { getErrorMessage } from '../../config';
import { AxiosError } from 'axios';

interface BodyData {
  password: string;
}

interface DefaultProps {
  resetPasswordAPIUrl: string;
  removeAccessTokenUrl: string;
}

interface AcceptInvitationSceneProps extends AbstractAuthOneInputSceneProps {
  resetPasswordAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

class AcceptInvitationScene
  extends AbstractAuthOneInputScene<BodyData, AcceptInvitationSceneProps>{
  public static defaultProps: DefaultProps = {
    resetPasswordAPIUrl: apis.PASSWORD_RESET,
    removeAccessTokenUrl: apis.LOGOUT,
  };

  componentWillMount(): void {
    parseParams()
      .then(({ user, access_token }) => validateTokenRequest(access_token, user))
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) =>
        this.setState({
          redirect: `${URL.ERROR}?message=${getErrorMessage(e)}`,
        }));
  }

  getPostUrl(): string {
    const { resetPasswordAPIUrl } = this.props;
    return resetPasswordAPIUrl;
  }

  getRedirectUrl(): string {
    return URL.RESET_SUCCESS;
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

  getTPrefix(): any {
    return 'resetPassword';
  }
}

export default AcceptInvitationScene;
