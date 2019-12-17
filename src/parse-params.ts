import queryString from 'query-string';
import deepmerge from 'deepmerge';
import * as H from 'history';

export interface AccessQuery {
  user: string;
  access_token: string; // eslint-disable-line camelcase
}

export interface InviteQuery {
  uid: string;
  invitation_token: string; // eslint-disable-line camelcase
}

export const parseAndGetQuery = (
  location: H.Location,
  strict: boolean = false,
  keys: string[] = ['access_token', 'user']
): Promise<any> => {
  const query = queryString.parse(location.search);
  return new Promise((resolve, reject) => {
    const params = deepmerge.all(
      keys.map((key) => {
        if (strict) {
          if (!query[key]) reject(new Error(`Missing information: ${key}`));
        }
        return { [key]: query[key] as string };
      })
    );
    return resolve(params);
  });
};
