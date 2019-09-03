import React from 'react';
import moxios from 'moxios';
import { shallow, ShallowWrapper } from 'enzyme';
import ForgotScene from './ForgotScene';
import { ReleoxLocale } from '../../typings';

describe('Instance function call tests', () => {
  it('should call getPostUrl', () => {
    const wrapper = shallow<ForgotScene>(<ForgotScene />);
    const url = wrapper.instance().getPostUrl();
    expect(url).toBe('undefined/Members/reset');
  });

  it('should call getRedirectUrl', () => {
    const wrapper = shallow<ForgotScene>(<ForgotScene />);
    const url = wrapper.instance().getRedirectUrl();
    expect(url).toBe('/forgot-success');
  });
});

describe('UI tests', () => {
  describe('Finnish translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow<ForgotScene>(<ForgotScene />);
    });

    it('should have finnish title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Nollaa salasana');
    });

    it('should have finnish subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Kirjoita sähköpostiosoitteesi niin lähetämme sinulle linkin jolla voit vaihtaa salasanasi.'); // tslint:disable-line:max-line-length
    });

    it('should have finnish placeholder', () => {
      const word = wrapper.find('AuthForm').prop('placeholder');
      expect(word).toBe('Sähköposti');
    });

    it('should have finnish buttonText', () => {
      const word = wrapper.find('AuthForm').prop('buttonText');
      expect(word).toBe('Nollaa');
    });
  });

  describe('English translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow<ForgotScene>(<ForgotScene locale={ReleoxLocale.EN} />);
    });

    it('should have english title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Reset your password');
    });

    it('should have english subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Please write your email and we send you password reset link.');
    });

    it('should have english placeholder', () => {
      const word = wrapper.find('AuthForm').prop('placeholder');
      expect(word).toBe('Email');
    });

    it('should have finnish buttonText', () => {
      const word = wrapper.find('AuthForm').prop('buttonText');
      expect(word).toBe('Reset');
    });
  });

  describe('getLinks test', () => {
    it('should have default links', () => {
      const wrapper = shallow<ForgotScene>(<ForgotScene />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/login',
          id: 'back-link',
          text: 'Takaisin kirjautumissivulle',
        }],
      );
    });

    it('should have default links in english', () => {
      const wrapper = shallow<ForgotScene>(<ForgotScene locale={ReleoxLocale.EN} />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/login',
          id: 'back-link',
          text: 'Back to login',
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

  const wrapper = shallow<ForgotScene>(<ForgotScene />);
  const body = {
    email: 'email@email.com',
  };
  const url = `${window.API_ENDPOINT}/Members/reset`;
  const redirect = '/forgot-success';

  it('should redirect when submit success', (done) => {
    moxios.stubRequest(`${window.API_ENDPOINT}/Members/reset`, {
      status: 204,
    });
    const onSubmit = wrapper.find('AuthForm').prop('onSubmit') as Function;
    onSubmit(body).then(() => {
      expect(wrapper.state().redirect).toBe('/forgot-success');
      done();
    });
  });

  it('should set error message', (done) => {
    moxios.stubRequest(`${window.API_ENDPOINT}/Members/reset`, {
      status: 404,
      response: { error: { message: 'Email not found' } },
    });

    const wrapper = shallow<ForgotScene>(<ForgotScene />);
    wrapper.instance().onSubmitMethod(url, body, redirect).then(() => {
      expect(wrapper.find('AuthLayout').prop('message')).toBe('Email not found');
      done();
    });
  });
});
