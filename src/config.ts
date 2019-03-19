import { AxiosError } from "axios";

declare global {
  interface Window {
    API_ENDPOINT: string;
    TOKEN_KEY: string;
    USER_ID_KEY: string;
  }
}

export const getApiUrl = (): string => window.API_ENDPOINT;
export const getTokenKey = (): string => window.TOKEN_KEY || 'accessToken';
export const getUserIdKey = (): string => window.USER_ID_KEY || 'userId';
export const saveAccessInformation = (accessToken: string, userId: string): Promise<void> =>
  new Promise((resolve) => {
    localStorage.setItem(getTokenKey(), accessToken);
    localStorage.setItem(getUserIdKey(), userId);
    resolve();
  });

export const getErrorMessage = (error: AxiosError) => {
  let errorMessage = error.message;
  const res = error.response;
  if (res &&
    typeof res.data !== 'string' &&
    res.data.error.message) errorMessage = res.data.error.message;
  return errorMessage;
};
