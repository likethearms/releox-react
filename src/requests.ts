import Axios from 'axios';
import apis from './apis';

export const validateTokenRequest = (accessToken: string, user: string) =>
  Axios.get(`${apis.MEMBER}/${user}?access_token=${accessToken}`);

export const forgotPasswordRequest = (url: string, body: { email: string }) =>
  Axios.post(url, body);

export const resetPasswordRequest = (url: string, body: { newPassword: string }) =>
  Axios.post(url, body);
