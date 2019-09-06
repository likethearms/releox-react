import queryString from 'query-string';

interface ParseParams {
  user: string;
  access_token: string; // eslint-disable-line camelcase
}

export const parseParams = (strict: boolean = false) => new Promise((resolve, reject) => {
  const query = queryString.parse(window.location.search);

  const params = {
    access_token: query.access_token as string,
    user: query.user as string,
  };

  if (strict) {
    if (!params.user || !params.access_token) {
      return reject(new Error('Missing User Object or Access Token'));
    }
  }

  return resolve(params);
});
