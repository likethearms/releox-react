import { URL } from '../../routes';
import { InputTypes } from '../../components/Input/Input';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import Axios from 'axios';
import { getErrorMessage } from '../../config';
import AbstractAuthOneInputScene, {
  AbstractAuthOneInputSceneProps,
  AbstractAuthOneInputSceneInputProps,
} from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import apis from '../../apis';

interface BodyData {
  email: string;
}

interface DefaultProps {
  forgotAPIUrl: string;
}

const CONTEXT = 'ForgotScene';

class ForgotScene extends AbstractAuthOneInputScene<BodyData, AbstractAuthOneInputSceneProps>{
  public static defaultProps: DefaultProps = {
    forgotAPIUrl: apis.FORGOT,
  };

  componentWillMount(): void {
    this.setState({ loading: false });
  }

  onSubmit(body: BodyData): void {
    const { onError, forgotAPIUrl } = this.props;
    Axios
      .post(forgotAPIUrl, body)
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

export default ForgotScene;
