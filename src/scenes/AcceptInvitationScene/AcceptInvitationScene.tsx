import queryString from 'query-string';
import { AxiosError } from 'axios';
import {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
  AbstractAuthOneInputScene,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import { getErrorMessage } from '../../config';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import { apis } from '../../apis';
import { routes } from '../../routes';
import { validateInvitationTokenRequest } from '../../requests';

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

const CONTEXT = 'AcceptInvitation';

/* eslint-disable class-methods-use-this */
export class AcceptInvitationScene
  extends AbstractAuthOneInputScene<BodyData, AcceptInvitationSceneProps> {
  static defaultProps: DefaultProps = {
    resetPasswordAPIUrl: apis.PASSWORD_RESET,
    removeAccessTokenUrl: apis.LOGOUT,
  };

  componentDidMount(): any {
    const query = queryString.parse(window.location.search);

    if (!query.uid || !query.invitation_token) return this.redirectError('Missing information');
    if (Array.isArray(query.uid) || Array.isArray(query.invitation_token)) return this.redirectError('Information is on wrong format');

    return validateInvitationTokenRequest(query.uid, query.invitation_token)
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) => this.setState({
        redirect: `${routes.ERROR}?message=${getErrorMessage(e)}`,
      }));
  }

  redirectError(message: string): void {
    this.setState({
      redirect: `${routes.ERROR}?message=${message}`,
    });
  }

  getPostUrl(): string {
    const q = queryString.parse(window.location.search);
    return `${apis.ACCEPT_INVITATION}?invitation_token=${q.invitation_token}&uid=${q.uid}`;
  }

  getRedirectUrl(): string {
    return routes.ACCEPT_INVITATION_SUCCESS;
  }

  getInitValues(): BodyData {
    return { password: '' };
  }

  getInputProps(): AbstractAuthOneInputSceneInputProps {
    return {
      name: 'password',
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
    return 'acceptInvitation';
  }
}
