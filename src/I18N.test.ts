import { t, ct } from './I18N';

describe('t', () => {
  afterAll(() => {
    window.RELEOX_OPTIONS = {};
  });

  it('should return fi by default', () => {
    expect(t('login.title')).toBe('Kirjaudu');
  });

  it('should return english title', () => {
    expect(t('login.title', 'en')).toBe('Login');
  });

  it('should return english title if option locale is set to en', () => {
    window.RELEOX_OPTIONS = { locale: 'en' };
    expect(t('login.title')).toBe('Login');
  });
});

describe('ct', () => {
  afterAll(() => {
    window.RELEOX_OPTIONS = {};
  });

  it('should return fi by default', () => {
    expect(ct('login')('title')).toBe('Kirjaudu');
  });

  it('should return english title', () => {
    expect(ct('login', 'en')('title')).toBe('Login');
  });

  it('should return english title if option locale is set to en', () => {
    window.RELEOX_OPTIONS = { locale: 'en' };
    expect(ct('login')('title')).toBe('Login');
  });
});
