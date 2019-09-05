import translations from './translations';
import { ReleoxLocale } from './typings';

/**
 * Get releox locale
 * @param locale ReleoxLocale
 */
const getLocale = (locale?: ReleoxLocale): ReleoxLocale => {
  if (locale) return locale;
  if (window.RELEOX_OPTIONS && window.RELEOX_OPTIONS.locale) {
    return window.RELEOX_OPTIONS.locale;
  }
  return 'fi';
};

/**
 * Translation
 *
 * Function return string from translation file
 * @param key string - translation key
 * @param locale ReleoxLocale - ReleoxLocale value
 */
export const t = (key: string, locale?: ReleoxLocale): string => {
  const l = getLocale(locale);
  return translations[l][key];
};

/**
 * Translation currying version
 * This version is cleaner to use in more complicated components
 * or long components than regular t function
 * @param prefix string
 * @param locale string
 */
export const ct = (prefix: string, locale?: ReleoxLocale) => (key: string): string => t(`${prefix}.${key}`, locale);
