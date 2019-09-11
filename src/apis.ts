import { getApiUrl } from './config';

export const apis = {
  MEMBER: `${getApiUrl()}/Members`,
  LOGIN: `${getApiUrl()}/Members/login`,
  FORGOT: `${getApiUrl()}/Members/reset`,
  PASSWORD_RESET: `${getApiUrl()}/Members/reset-password`,
  LOGOUT: `${getApiUrl()}/Members/logout`,
  PATCH: `${getApiUrl()}/Members`,
  CONFIRM: `${getApiUrl()}/Members/confirm?uid=:userId&token=:confirmationToken`,
  ACCEPT_INVITATION: `${getApiUrl()}/Members/accept-invitation`,
  VALIDATE_INVITATION_TOKEN: `${getApiUrl()}/Members/validate-invitation-token?uid=:userId&invitation_token=:invitationToken`,
  VALIDATE_ACCESS_TOKEN: `${getApiUrl()}/Members/:userId?access_token=:accessToken`,
};
