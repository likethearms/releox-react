import Axios from 'axios';
import apis from './apis';

export const validateTokenRequest = (accessToken: string, user: string) =>
  Axios.get(`${apis.MEMBER}/${user}?access_token=${accessToken}`);
