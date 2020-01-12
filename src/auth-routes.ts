import { ReleoxRoutes, routes } from './routes';
import { guestMiddleware } from './HOC/guest-middleware';
import { LoginScene } from './scenes/LoginScene/LoginScene';
import { ForgotScene } from './scenes/ForgotScene/ForgotScene';
import { ForgotSuccessScene } from './scenes/ForgotSuccessScene/ForgotSuccessScene';
import { ResetPasswordScene } from './scenes/ResetPasswordScene/ResetPasswordScene';
import { ResetPasswordSuccessScene } from './scenes/ResetPasswordSuccessScene/ResetPasswordSuccessScene';
import { AcceptInvitationScene } from './scenes/AcceptInvitationScene/AcceptInvitationScene';
import { AcceptInvitationSuccessScene } from './scenes/AcceptInvitationSuccessScene/AcceptInvitationSuccessScene';
import { AuthErrorScene } from './scenes/AuthErrorScene/AuthErrorScene';
import { ConfirmScene } from './scenes/ConfirmScene/ConfirmScene';
import { LogoutScene } from './scenes/LogoutScene/LogoutScene';
import { getReleoxOption } from './config';

export const getAuthRoutes: () => ReleoxRoutes[] = () => {
  const r = [
    {
      url: routes.RESET,
      component: guestMiddleware(ResetPasswordScene),
    },
    {
      url: routes.RESET_SUCCESS,
      component: guestMiddleware(ResetPasswordSuccessScene),
    },
    {
      url: routes.ERROR,
      component: AuthErrorScene,
    },
    {
      url: routes.ACCEPT_INVITATION,
      component: guestMiddleware(AcceptInvitationScene),
    },
    {
      url: routes.ACCEPT_INVITATION_SUCCESS,
      component: guestMiddleware(AcceptInvitationSuccessScene),
    },
    {
      url: routes.CONFIRM,
      component: ConfirmScene,
    },
  ];

  if (getReleoxOption('mobileSupportOnly')) {
    r.push(
      {
        url: routes.LOGIN,
        component: guestMiddleware<any>(LoginScene),
      },
      {
        url: routes.FORGOT,
        component: guestMiddleware(ForgotScene),
      },
      {
        url: routes.FORGOT_SUCCESS,
        component: guestMiddleware(ForgotSuccessScene),
      },
      {
        url: routes.LOGOUT,
        component: LogoutScene,
      }
    );
  }
  return r;
};
