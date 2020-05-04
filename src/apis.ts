import { getApiUrl, getReleoxOption } from './config';

export const getApis = () => {
  const model = getReleoxOption('loginModelName');
  return {
    MEMBER: `${getApiUrl()}/${model}`,
    LOGIN: `${getApiUrl()}/${model}/login`,
    FORGOT: `${getApiUrl()}/${model}/reset`,
    PASSWORD_RESET: `${getApiUrl()}/${model}/reset-password`,
    LOGOUT: `${getApiUrl()}/${model}/logout`,
    PATCH: `${getApiUrl()}/${model}`,
    CONFIRM: `${getApiUrl()}/${model}/confirm?uid=:userId&token=:confirmationToken`,
    ACCEPT_INVITATION: `${getApiUrl()}/${model}/accept-invitation?uid=:userId&invitation_token=:invitationToken`,
    VALIDATE_INVITATION_TOKEN: `${getApiUrl()}/${model}/validate-invitation-token?uid=:userId&invitation_token=:invitationToken`,
    VALIDATE_ACCESS_TOKEN: `${getApiUrl()}/${model}/:userId?access_token=:accessToken`,
  };
};
