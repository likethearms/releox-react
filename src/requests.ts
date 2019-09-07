import Axios from 'axios';
import { apis } from './apis';

export const validateTokenRequest = (accessToken: string, user: string) => Axios
  .get(`${apis.MEMBER}/${user}?access_token=${accessToken}`);

export const confirmUserRequest = (userId: string, confirmationToken: string) => Axios
  .get(`${apis.CONFIRM}?uid=${userId}&token=${confirmationToken}`);

export const patchUserRequest = (userId: string, body: any) => Axios
  .patch(`${apis.PATCH}/${userId}`, body);

export const logoutRequest = (accessToken: string) => Axios
  .post(apis.LOGOUT, undefined, { params: { access_token: accessToken } });

export const loginRequest = (body: any) => Axios
  .post(apis.LOGIN, body);

export const validateInvitationTokenRequest = (userId: string, invitationToken: string) => Axios
  .get(`${apis.VALIDATE_INVITATION_TOKEN}?uid=${userId}&invitation_token=${invitationToken}`);
