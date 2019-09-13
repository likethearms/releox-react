import { AxiosError } from 'axios';
import { routes } from '../../routes';
import {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
  AbstractAuthOneInputScene,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import { apis } from '../../apis';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import { parseParams } from '../../parse-params';
import { validateTokenRequest } from '../../requests';

interface BodyData {
  newPassword: string;
}

interface DefaultProps {
  resetPasswordAPIUrl: string;
}

export interface ResetPasswordSceneProps extends AbstractAuthOneInputSceneProps {
  resetPasswordAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

/* eslint-disable class-methods-use-this */
export class ResetPasswordScene
  extends AbstractAuthOneInputScene<BodyData, ResetPasswordSceneProps> {
  static defaultProps: DefaultProps = {
    resetPasswordAPIUrl: apis.PASSWORD_RESET,
  };

  componentDidMount(): void {
    /* eslint-disable camelcase */
    parseParams(true)
      .then(({ user, access_token }) => validateTokenRequest(user, access_token))
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) => this.setState({ redirect: getAuthErrorUrl(getErrorMessage(e)) }));
    /* eslint-enable camelcase */
  }

  getPostUrl(): string {
    const { resetPasswordAPIUrl } = this.props;
    return resetPasswordAPIUrl;
  }

  getRedirectUrl(): string {
    return routes.RESET_SUCCESS;
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
