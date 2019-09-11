import { routes } from '../../routes';
import { successScene } from '../../HOC/success-scene';

export const ForgotSuccessScene = successScene('ForgotSuccessScene', 'forgotSuccess', routes.LOGIN);
