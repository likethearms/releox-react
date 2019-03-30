import translations from './translations';

export enum ReleoxLocale {
  FI = 'fi',
  EN = 'en',
}

declare global {
  interface Window { LOCALE: ReleoxLocale; }
}

const getLocale = (locale?: ReleoxLocale): ReleoxLocale => {
  if (locale) return locale;
  if (window.LOCALE) return window.LOCALE;
  return ReleoxLocale.FI;
};

export const t = (key: string, locale?: ReleoxLocale): string => {
  const l = getLocale(locale);
  return translations[l][key];
};

export const ct = (prefix: string, locale?: ReleoxLocale) => (key: string): string => {
  return t(`${prefix}.${key}`, locale);
};
