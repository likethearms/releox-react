import Axios from 'axios';
import { apis } from './apis';

const get = (url: string) => Axios.get(url);

export const validateTokenRequest = (accessToken: string, user: string) => get(`${apis.MEMBER}/${user}?access_token=${accessToken}`);
export const validateInvitationTokenRequest = (userId: string, invitationToken: string) => get(`${apis.VALIDATE_INVITATION_TOKEN}?uid=${userId}&invitation_token=${invitationToken}`);
export const confirmUserRequest = (userId: string, confirmationToken: string) => get(`${apis.CONFIRM}?uid=${userId}&token=${confirmationToken}`);

export const patchUserRequest = (userId: string, body: any) => Axios
  .patch(`${apis.PATCH}/${userId}`, body);

export const logoutRequest = (accessToken: string) => Axios
  .post(apis.LOGOUT, undefined, { params: { access_token: accessToken } });

export const loginRequest = (body: any) => Axios
  .post(apis.LOGIN, body);
