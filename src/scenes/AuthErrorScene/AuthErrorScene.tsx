import queryString from 'query-string';
import { successScene } from '../../HOC/success-scene';
import { routes } from '../../routes';

export const AuthErrorScene = successScene('AuthErrorScene', 'authError', routes.LOGIN, () => {
  const query = queryString.parse(window.location.search);
  return query.message as string;
});
