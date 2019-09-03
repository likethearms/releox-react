import URL from '../../routes';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import apis from '../../apis';
import { AuthLayoutLinkItem } from '../../typings';

interface BodyData {
  email: string;
}

interface DefaultProps {
  forgotAPIUrl: string;
}

interface ForgotSceneProps extends AbstractAuthOneInputSceneProps {
  forgotAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

/* eslint-disable class-methods-use-this */
class ForgotScene extends AbstractAuthOneInputScene<BodyData, ForgotSceneProps> {
  static defaultProps: DefaultProps;

  componentDidMount(): void {
    this.setState({ loading: false });
  }

  onSubmit(body: BodyData): void {
    const { forgotAPIUrl } = this.props;
    this.onSubmitMethod(forgotAPIUrl, body, URL.FORGOT_SUCCESS);
  }

  getPostUrl(): string {
    const { forgotAPIUrl } = this.props;
    return forgotAPIUrl;
  }

  getRedirectUrl(): string {
    return URL.FORGOT_SUCCESS;
  }

  getInitValues(): BodyData {
    return { email: '' };
  }

  getInputProps(): AbstractAuthOneInputSceneInputProps {
    return {
      name: 'email',
      type: 'email',
    };
  }

  getLinks(): AuthLayoutLinkItem[] {
    const t = this.getT();
    return [
      {
        id: 'back-link',
        to: URL.LOGIN,
        text: t('linkText'),
      },
    ];
  }

  getContext(): string {
    return CONTEXT;
  }

  getTPrefix(): string {
    return 'forgot';
  }
}

ForgotScene.defaultProps = {
  forgotAPIUrl: apis.FORGOT,
};

export default ForgotScene;
