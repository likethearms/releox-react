import { routes } from './routes';

declare global {
  interface Window {
    API_ENDPOINT: string;
    RELEOX_OPTIONS: ReleoxOptions;
  }
}

export interface AccessInformation {
  userId: string;
  accessToken: string;
}

export interface ReleoxOptions {
  showRegisterLink?: boolean;
  mobileSupportOnly?: boolean;
  userIdKey?: string;
  tokenKey?: string;
  loginModelName?: string;
  siteTitle?: string;
}

export type ReleoxOptionKeys =
  | 'showRegisterLink'
  | 'userIdKey'
  | 'tokenKey'
  | 'loginModelName'
  | 'mobileSupportOnly'
  | 'siteTitle';

const defaultOptions: ReleoxOptions = {
  userIdKey: 'userId',
  tokenKey: 'accessToken',
};

export const getReleoxOptions = (): ReleoxOptions => {
  const { RELEOX_OPTIONS } = window;
  if (RELEOX_OPTIONS === undefined) window.RELEOX_OPTIONS = defaultOptions;
  window.RELEOX_OPTIONS = { ...defaultOptions, ...RELEOX_OPTIONS };
  return window.RELEOX_OPTIONS;
};

export const setReleoxOptions = (object: ReleoxOptions): ReleoxOptions => {
  const options = {
    ...getReleoxOptions(),
    ...object,
  };
  window.RELEOX_OPTIONS = options;
  return window.RELEOX_OPTIONS;
};
export const getReleoxOption = (key: ReleoxOptionKeys): any => getReleoxOptions()[key];

export const getApiUrl = (): string => window.API_ENDPOINT || '';
export const getTokenKey = (): string => getReleoxOption('tokenKey');
export const getUserIdKey = (): string => getReleoxOption('userIdKey');
export const saveAccessInformation = (accessToken: string, userId: string): Promise<void> =>
  new Promise((resolve) => {
    localStorage.setItem(getTokenKey(), accessToken);
    localStorage.setItem(getUserIdKey(), userId);
    resolve();
  });

export const getAccessInformation = (): Promise<AccessInformation> =>
  new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem(getTokenKey());
    const userId = localStorage.getItem(getUserIdKey());
    if (!accessToken || !userId) return reject(new Error('Some Access Information cannot found'));
    return resolve({ accessToken, userId });
  });

export const destroyAccessInformation = (): Promise<any> =>
  new Promise((resolve) => {
    localStorage.removeItem(getTokenKey());
    localStorage.removeItem(getUserIdKey());
    return resolve();
  });

export const getErrorMessage = (error: any) => {
  let errorMessage = error.message;
  const res = error.response;
  if (res && typeof res.data !== 'string' && res.data.error.message)
    errorMessage = res.data.error.message;
  return errorMessage;
};

export const getAuthErrorUrl = (message: string) => `${routes.ERROR}?message=${message}`;
