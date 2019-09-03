import translations from './translations';
import { ReleoxLocale } from './typings';

declare global {
  interface Window { LOCALE: ReleoxLocale; }
}

const getLocale = (locale?: ReleoxLocale): ReleoxLocale => {
  if (locale) return locale;
  if (window.LOCALE) return window.LOCALE;
  return 'fi';
};

export const t = (key: string, locale?: ReleoxLocale): string => {
  const l = getLocale(locale);
  return translations[l][key];
};

export const ct = (prefix: string, locale?: ReleoxLocale) => (key: string): string => t(`${prefix}.${key}`, locale);
