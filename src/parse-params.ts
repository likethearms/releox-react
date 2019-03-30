import queryString from 'query-string';

interface ParseParams {
  user: string;
  access_token: string;
}

export default (): Promise<ParseParams> => new Promise((resolve, reject) => {
  let query;
  if (process.env.STORYBOOK_ENV) {
    query = queryString.parse(window.location.search);
  } else {
    query = { user: 'user', access_token: 'access_token' };
  }
  const params = {
    access_token: query.access_token as string,
    user: query.user as string,
  };
  if (!params.user || !params.access_token) {
    return reject(new Error('Missing User Object or Access Token'));
  }
  return resolve(params);
});
