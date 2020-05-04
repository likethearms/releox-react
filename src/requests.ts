import Axios from 'axios';
import { getApis } from './apis';

const injectUrl = (url: string, userId: string, tokenName: string, token: string) =>
  url.replace(':userId', userId).replace(tokenName, token);

export const validateTokenRequest = (userId: string, accessToken: string) =>
  Axios.get(injectUrl(getApis().VALIDATE_ACCESS_TOKEN, userId, ':accessToken', accessToken));

export const validateInvitationTokenRequest = (userId: string, invitationToken: string) =>
  Axios.get(
    injectUrl(getApis().VALIDATE_INVITATION_TOKEN, userId, ':invitationToken', invitationToken)
  );

export const confirmUserRequest = (userId: string, confirmationToken: string) =>
  Axios.get(injectUrl(getApis().CONFIRM, userId, ':confirmationToken', confirmationToken));

export const patchUserRequest = (userId: string, body: any) =>
  Axios.patch(`${getApis().PATCH}/${userId}`, body);

export const logoutRequest = (accessToken: string) =>
  Axios.post(getApis().LOGOUT, undefined, { params: { access_token: accessToken } });

export const loginRequest = (body: any) => Axios.post(getApis().LOGIN, body);
