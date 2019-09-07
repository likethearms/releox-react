import Axios from 'axios';
import { apis } from './apis';

const get = (url: string) => Axios.get(url);

const injectUserId = (url: string, userId: string) => url.replace(':userId', userId);

export const validateTokenRequest = (userId: string, accessToken: string) => {
  const url = injectUserId(apis.VALIDATE_ACCESS_TOKEN, userId).replace(':accessToken', accessToken);
  return get(url);
};

export const validateInvitationTokenRequest = (userId: string, invitationToken: string) => {
  const url = injectUserId(apis.VALIDATE_INVITATION_TOKEN, userId).replace(':invitationToken', invitationToken);
  return get(url);
};

export const confirmUserRequest = (userId: string, confirmationToken: string) => {
  const url = injectUserId(apis.CONFIRM, userId).replace(':confirmationToken', confirmationToken);
  return get(url);
};

export const patchUserRequest = (userId: string, body: any) => Axios
  .patch(`${apis.PATCH}/${userId}`, body);

export const logoutRequest = (accessToken: string) => Axios
  .post(apis.LOGOUT, undefined, { params: { access_token: accessToken } });

export const loginRequest = (body: any) => Axios
  .post(apis.LOGIN, body);
