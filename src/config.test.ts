import { getUserIdKey, getTokenKey, getReleoxOption, setReleoxOptions } from './config';

describe('getUserIdKey', () => {
  afterAll(() => {
    window.RELEOX_OPTIONS = {};
  });

  it('should return userId by default', () => {
    expect(getUserIdKey()).toBe('userId');
  });

  it('should return fooBar by default', () => {
    window.RELEOX_OPTIONS = { userIdKey: 'fooBar' };
    expect(getUserIdKey()).toBe('fooBar');
  });
});

describe('getTokenKey', () => {
  afterAll(() => {
    window.RELEOX_OPTIONS = {};
  });

  it('should return userId by default', () => {
    expect(getTokenKey()).toBe('accessToken');
  });

  it('should return fooBar by default', () => {
    window.RELEOX_OPTIONS = { tokenKey: 'fooBar' };
    expect(getTokenKey()).toBe('fooBar');
  });
});

describe('getReleoxOption', () => {
  it('should return releox options by key', () => {
    window.RELEOX_OPTIONS = {
      locale: 'fi',
    };
    expect(getReleoxOption('locale')).toBe('fi');
  });
});

describe('setReleoxOptions', () => {
  it('should set options', () => {
    window.RELEOX_OPTIONS = {
      locale: 'fi',
    };
    setReleoxOptions({ locale: 'en', tokenKey: 'tokenKey' });
    expect(window.RELEOX_OPTIONS.locale).toBe('en');
    expect(window.RELEOX_OPTIONS.tokenKey).toBe('tokenKey');
  });
});
