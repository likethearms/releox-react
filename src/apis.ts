import { getApiUrl } from './config';

export const apis = {
  MEMBER: `${getApiUrl()}/Members`,
  LOGIN: `${getApiUrl()}/Members/login`,
  FORGOT: `${getApiUrl()}/Members/reset`,
  PASSWORD_RESET: `${getApiUrl()}/Members/reset-password`,
  LOGOUT: `${getApiUrl()}/Members/logout`,
  PATCH: `${getApiUrl()}/Members`,
  CONFIRM: `${getApiUrl()}/Members/confirm`,
  ACCEPT_INVITATION: `${getApiUrl()}/Members/accept-invitation`,
  VALIDATE_INVITATION_TOKEN: `${getApiUrl()}/Members/validate-invitation-token`,
};
