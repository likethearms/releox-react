import queryString from 'query-string';

interface ParseParams {
  user: string;
  access_token: string;
}

export default (strict: boolean = false): Promise<ParseParams> => new Promise((resolve, reject) => {
  let query;
  query = queryString.parse(window.location.search);
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
