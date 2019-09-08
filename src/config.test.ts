import { getUserIdKey, getTokenKey } from './config';

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
