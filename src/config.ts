import { ReleoxOptions } from './typings';

declare global {
  interface Window {
    API_ENDPOINT: string;
    TOKEN_KEY: string;
    USER_ID_KEY: string;
    RELEOX_OPTIONS: ReleoxOptions;
  }
}

export interface AccessInformation {
  userId: string;
  accessToken: string;
}

export const getReleoxOptions = (): ReleoxOptions => window.RELEOX_OPTIONS || {};
export const getApiUrl = (): string => window.API_ENDPOINT;
export const getTokenKey = (): string => window.TOKEN_KEY || 'accessToken';
export const getUserIdKey = (): string => window.USER_ID_KEY || 'userId';
export const saveAccessInformation = (
  accessToken: string,
  userId: string,
): Promise<void> => new Promise((resolve) => {
  localStorage.setItem(getTokenKey(), accessToken);
  localStorage.setItem(getUserIdKey(), userId);
  resolve();
});

export const getAccessInformation = (): Promise<AccessInformation> => new Promise(
  (resolve, reject) => {
    const accessToken = localStorage.getItem(getTokenKey());
    const userId = localStorage.getItem(getUserIdKey());
    if (!accessToken || !userId) return reject(new Error('Some Access Information cannot found'));
    return resolve({ accessToken, userId });
  },
);

export const destroyAccessInformation = (): Promise<void> => new Promise((resolve) => {
  localStorage.removeItem(getTokenKey());
  localStorage.removeItem(getUserIdKey());
  return resolve();
});

export const getErrorMessage = (error: any) => {
  let errorMessage = error.message;
  const res = error.response;
  if (res && typeof res.data !== 'string' && res.data.error.message) errorMessage = res.data.error.message;
  return errorMessage;
};
