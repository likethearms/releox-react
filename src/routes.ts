export interface ReleoxRoutes {
  component: any;
  url: string;
}

export const routes = {
  FORGOT: '/forgot',
  FORGOT_SUCCESS: '/forgot-success',
  CONFIRM: '/confirm',
  RESET: '/reset-password',
  RESET_SUCCESS: '/reset-password-success',
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ERROR: '/auth-error',
  LOGOUT: '/logout',
  ACCEPT_INVITATION: '/accept-invitation',
  ACCEPT_INVITATION_SUCCESS: '/accept-invitation-success',
};
