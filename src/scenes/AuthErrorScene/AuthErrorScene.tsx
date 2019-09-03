import queryString from 'query-string';
import successScene from '../../HOC/success-scene';
import URL from '../../routes';

export default successScene('AuthErrorScene', 'authError', URL.LOGIN, () => {
  const query = queryString.parse(window.location.search);
  return query.message as string;
});
