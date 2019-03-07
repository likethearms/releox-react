import ForgotScene from '../scenes/ForgotScene';
import LoginScene from '../scenes/LoginScene';
import ResetPasswordScene from '../scenes/ResetPasswordScene';
import AcceptInvitation from '../scenes/AcceptInvitationScene';
import ConfirmScene from '../scenes/ConfirmScene';

export default [
  {
    path: '/login',
    component: LoginScene,
  },
  {
    path: '/forgot',
    component: ForgotScene,
  },
  {
    path: '/confirm',
    component: ConfirmScene,
  },
  {
    path: '/reset-password',
    component: ResetPasswordScene,
  },
  {
    path: '/accept-invitation',
    component: AcceptInvitation,
  },
];
