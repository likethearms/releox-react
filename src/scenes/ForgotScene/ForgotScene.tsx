import { routes } from '../../routes';
import {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
  AbstractAuthOneInputScene,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import { apis } from '../../apis';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';

interface BodyData {
  email: string;
}

interface DefaultProps {
  forgotAPIUrl: string;
}

export interface ForgotSceneProps extends AbstractAuthOneInputSceneProps {
  forgotAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

/* eslint-disable class-methods-use-this */
class ForgotSceneComponent extends AbstractAuthOneInputScene<BodyData, ForgotSceneProps> {
  static defaultProps: DefaultProps;

  componentDidMount(): void {
    this.setState({ loading: false });
  }

  onSubmit(body: BodyData): Promise<void> {
    const { forgotAPIUrl } = this.props;
    return this.onSubmitMethod(forgotAPIUrl, body, routes.FORGOT_SUCCESS);
  }

  getPostUrl(): string {
    const { forgotAPIUrl } = this.props;
    return forgotAPIUrl;
  }

  getRedirectUrl(): string {
    return routes.FORGOT_SUCCESS;
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
        to: routes.LOGIN,
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

ForgotSceneComponent.defaultProps = {
  forgotAPIUrl: apis.FORGOT,
};

export const ForgotScene = ForgotSceneComponent;
