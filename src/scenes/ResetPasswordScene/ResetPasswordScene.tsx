import { AxiosError } from 'axios';
import URL from '../../routes';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import apis from '../../apis';
import validateTokenRequest from '../../requests';
import parseParams from '../../parse-params';
import { getErrorMessage } from '../../config';
import { AuthLayoutLinkItem } from '../../typings';

interface BodyData {
  newPassword: string;
}

interface DefaultProps {
  resetPasswordAPIUrl: string;
}

interface ResetPasswordSceneProps extends AbstractAuthOneInputSceneProps {
  resetPasswordAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

/* eslint-disable class-methods-use-this */
class ResetPasswordScene extends AbstractAuthOneInputScene<BodyData, ResetPasswordSceneProps> {
  static defaultProps: DefaultProps;

  componentDidMount(): void {
    /* eslint-disable camelcase */
    parseParams(true)
      .then(({ user, access_token }) => validateTokenRequest(access_token, user))
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) => this.setState({
        redirect: `${URL.ERROR}?message=${getErrorMessage(e)}`,
      }));
    /* eslint-enable camelcase */
  }

  getPostUrl(): string {
    const { resetPasswordAPIUrl } = this.props;
    return resetPasswordAPIUrl;
  }

  getRedirectUrl(): string {
    return URL.RESET_SUCCESS;
  }

  shouldDestroyToken(): boolean {
    return true;
  }

  getInitValues(): BodyData {
    return { newPassword: '' };
  }

  getInputProps(): AbstractAuthOneInputSceneInputProps {
    return {
      name: 'newPassword',
      type: 'password',
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

ResetPasswordScene.defaultProps = {
  resetPasswordAPIUrl: apis.PASSWORD_RESET,
};

export default ResetPasswordScene;
