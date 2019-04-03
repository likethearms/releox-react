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
import AcceptInvitationScene from './scenes/AcceptInvitationScene/AcceptInvitationScene';
import AcceptInvitationSuccessScene
  from './scenes/AcceptInvitationSuccessScene/AcceptInvitationSuccessScene';
import LogoutScene from './scenes/LogoutScene/LogoutScene';

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
    url: URL.ACCEPT_INVITATION,
    component: guestMiddleware(AcceptInvitationScene),
  },
  {
    url: URL.ACCEPT_INVITATION_SUCCESS,
    component: guestMiddleware(AcceptInvitationSuccessScene),
  },
  {
    url: URL.ERROR,
    component: AuthErrorScene,
  },
  {
    url: URL.CONFIRM,
    component: ConfirmScene,
  },
  {
    url: URL.LOGOUT,
    component: LogoutScene,
  },
];

export default authRoutes;
