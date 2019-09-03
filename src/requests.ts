import Axios from 'axios';
import apis from './apis';

export default (
  accessToken: string,
  user: string,
) => Axios.get(`${apis.MEMBER}/${user}?access_token=${accessToken}`);
