import { URL } from './routes';
import LoginScene from './scenes/LoginScene/LoginScene';
import ForgotScene from './scenes/ForgotScene/ForgotScene';
import ForgotSuccessScene from './scenes/ForgotSuccessScene/ForgotSuccessScene';
import ResetPasswordSuccessScene
  from './scenes/ResetPasswordSuccessScene/ResetPasswordSuccessScene';
import ResetPasswordScene from './scenes/ResetPasswordScene/ResetPasswordScene';
import AuthErrorScene from './scenes/AuthErrorScene/AuthErrorScene';
import guestMiddleware from './HOC/guest-middleware';
import ConfirmScene from './scenes/ConfirmScene/ConfirmScene';

export interface ReleoxRoutes {
  component: any;
  url: string;
}

const authRoutes: ReleoxRoutes[] = [
  {
    url: URL.LOGIN,
    component: guestMiddleware(LoginScene),
  },
  {
    url: URL.FORGOT,
    component: guestMiddleware(ForgotScene),
  },
  {
    url: URL.FORGOT_SUCCESS,
    component: guestMiddleware(ForgotSuccessScene),
  },
  {
    url: URL.RESET,
    component: guestMiddleware(ResetPasswordScene),
  },
  {
    url: URL.RESET_SUCCESS,
    component: guestMiddleware(ResetPasswordSuccessScene),
  },
  {
    url: URL.ERROR,
    component: AuthErrorScene,
  },
  {
    url: URL.CONFIRM,
    component: ConfirmScene,
  },
];

export default authRoutes;
