import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import moxios from 'moxios';
import LoginScene from './LoginScene';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';
import { ReleoxLocale } from '../../typings';

describe('onSubmit', () => {
  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow<LoginScene>(<LoginScene onSubmit={onSubmit} />);
    wrapper.find<FormikFormWrapper>(FormikFormWrapper).props().onSubmit();
    expect(onSubmit).toBeCalledTimes(1);
  });
});

describe('UI tests', () => {
  describe('Finnish translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow<LoginScene>(<LoginScene />);
    });

    it('should have finnish title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Kirjaudu');
    });

    it('should have finnish subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Täytä tiedot ja kirjaudu sisään');
    });

    it('should have finnish email placeholder', () => {
      const word = wrapper.find('[name="email"]').prop('label');
      expect(word).toBe('Sähköposti');
    });

    it('should have finnish password placeholder', () => {
      const word = wrapper.find('[name="password"]').prop('label');
      expect(word).toBe('Salasana');
    });

    it('should have finnish button text', () => {
      const word = wrapper.find('Button').prop('children');
      expect(word).toBe('Kirjaudu');
    });
  });

  describe('English translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow<LoginScene>(<LoginScene locale={ReleoxLocale.EN} />);
    });

    it('should have english title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Login');
    });

    it('should have english subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Fill form and login');
    });

    it('should have english email placeholder', () => {
      const word = wrapper.find('[name="email"]').prop('label');
      expect(word).toBe('Email');
    });

    it('should have english password placeholder', () => {
      const word = wrapper.find('[name="password"]').prop('label');
      expect(word).toBe('Password');
    });

    it('should have english button text', () => {
      const word = wrapper.find('Button').prop('children');
      expect(word).toBe('Login');
    });
  });

  describe('getLinks test', () => {
    it('should have default links', () => {
      const wrapper = shallow<LoginScene>(<LoginScene />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/forgot',
          id: 'LoginScene-forgot-link',
          text: 'Unohditko salasanasi?',
        }],
      );
    });

    it('should have default links in english', () => {
      const wrapper = shallow<LoginScene>(<LoginScene locale={ReleoxLocale.EN} />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/forgot',
          id: 'LoginScene-forgot-link',
          text: 'Forgot password?',
        }],
      );
    });

    it('should show register link if showRegisterLink is set to true', () => {
      window.RELEOX_OPTIONS = { showRegisterLink: true };
      const wrapper = shallow<LoginScene>(<LoginScene />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/forgot',
          id: 'LoginScene-forgot-link',
          text: 'Unohditko salasanasi?',
        },
        {
          to: '/register',
          id: 'LoginScene-register-link',
          text: 'Oletko uusi? Luo tunnus!',
        }],
      );
    });

    it('should show register link in english if showRegisterLink is set to true and locale is set to EN', () => {
      window.RELEOX_OPTIONS = { showRegisterLink: true };
      const wrapper = shallow<LoginScene>(<LoginScene locale={ReleoxLocale.EN} />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/forgot',
          id: 'LoginScene-forgot-link',
          text: 'Forgot password?',
        },
        {
          to: '/register',
          id: 'LoginScene-register-link',
          text: 'New? Create new account!',
        }],
      );
    });
  });
});

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const wrapper = shallow<LoginScene>(<LoginScene />);
  const body = {
    email: 'email@email.com',
    password: 'password',
  };

  it('should redirect when submit success', (done) => {
    moxios.stubRequest(`${window.API_ENDPOINT}/Members/login`, {
      status: 200,
      response: { data: { id: 1, userId: 1 } },
    });

    wrapper.instance().onSubmit(body).then(() => {
      expect(wrapper.state().redirect).toBe('/');
      done();
    });
  });

  it('should set error message to message state', (done) => {
    moxios.stubRequest(`${window.API_ENDPOINT}/Members/login`, {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });

    const wrapper = shallow<LoginScene>(<LoginScene />);
    wrapper.instance().onSubmit(body).then(() => {
      expect(wrapper.state().message).toBe('Foo bar');
      done();
    });
  });

  it('should call custom error handler if errorHander is passed to component', (done) => {
    const onError = jest.fn();
    moxios.stubRequest(`${window.API_ENDPOINT}/Members/login`, {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });

    const wrapper = shallow<LoginScene>(<LoginScene onError={onError} />);
    wrapper.instance().onSubmit(body).then(() => {
      expect(onError).toBeCalledTimes(1);
      done();
    });
  });
});
