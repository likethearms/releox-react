import { URL } from '../../routes';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import apis from '../../apis';
import queryString from 'query-string';
import { getErrorMessage } from '../../config';
import Axios, { AxiosError } from 'axios';
import { InputTypes, AuthLayoutLinkItem } from '../../typings';

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

class AcceptInvitationScene
  extends AbstractAuthOneInputScene<BodyData, AcceptInvitationSceneProps>{
  public static defaultProps: DefaultProps = {
    resetPasswordAPIUrl: apis.PASSWORD_RESET,
    removeAccessTokenUrl: apis.LOGOUT,
  };

  componentWillMount(): void {
    const q = queryString.parse(window.location.search);
    Axios
      .get(`${apis.VALIDATE_INVITATION_TOKEN}?uid=${q.uid}&invitation_token=${q.invitation_token}`)
      .then(() => this.setState({ loading: false }))
      .catch((e: AxiosError) =>
        this.setState({
          redirect: `${URL.ERROR}?message=${getErrorMessage(e)}`,
        }));
  }

  getPostUrl(): string {
    const q = queryString.parse(window.location.search);
    return `${apis.ACCEPT_INVITATION}?invitation_token=${q.invitation_token}&uid=${q.uid}`;
  }

  getRedirectUrl(): string {
    return URL.ACCEPT_INVITATION_SUCCESS;
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

export default AcceptInvitationScene;
