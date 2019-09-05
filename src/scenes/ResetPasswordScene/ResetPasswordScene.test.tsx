import React from 'react';
import moxios from 'moxios';
import { shallow, ShallowWrapper } from 'enzyme';
import ResetPasswordScene from './ResetPasswordScene';

describe('Instance function call tests', () => {
  it('should call getPostUrl', () => {
    const wrapper = shallow<ResetPasswordScene>(<ResetPasswordScene />);
    const url = wrapper.instance().getPostUrl();
    expect(url).toBe('undefined/Members/reset-password');
  });

  it('should call getRedirectUrl', () => {
    const wrapper = shallow<ResetPasswordScene>(<ResetPasswordScene />);
    const url = wrapper.instance().getRedirectUrl();
    expect(url).toBe('/reset-password-success');
  });
});

describe('UI tests', () => {
  describe('Error check', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<ResetPasswordScene />);
    });
    // minkä takia tämä tuottaa stateem tuon virhe redirectin
    // mutta suoraan wrapperin luonti ei tee tätä
    it('should return error when no user object or access token is not present', () => {
      expect(wrapper.state().redirect).toBe('/auth-error?message=Missing User Object or Access Token');
    });
  });

  describe('Finnish translations', () => {
    window.location = {
      search: '?access_token=Qs1XAHvAUVnKelnz4xk0WUWweAhU92yLqCzVUGSjEpFEjJBagS73GWsoPz3ldkfq&user=1',
    } as any;
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<ResetPasswordScene />);
    });

    it('should have finnish title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Kirjoita uusi salasana');
    });

    it('should have finnish subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Kirjoita uusi salasana ja paina tallenna');
    });

    it('should have finnish placeholder', () => {
      const word = wrapper.find('AuthForm').prop('placeholder');
      expect(word).toBe('Salasana');
    });

    it('should have finnish buttonText', () => {
      const word = wrapper.find('AuthForm').prop('buttonText');
      expect(word).toBe('Tallenna');
    });
  });

  describe('English translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<ResetPasswordScene locale="en" />);
    });

    it('should have english title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Set new password');
    });

    it('should have english subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Write new password and click save!');
    });

    it('should have english placeholder', () => {
      const word = wrapper.find('AuthForm').prop('placeholder');
      expect(word).toBe('Password');
    });

    it('should have finnish buttonText', () => {
      const word = wrapper.find('AuthForm').prop('buttonText');
      expect(word).toBe('Save');
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

  const wrapper = shallow<ResetPasswordScene>(<ResetPasswordScene />);
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

  it('should set error message to message state', (done) => {
    moxios.stubRequest(`${window.API_ENDPOINT}/Members/reset`, {
      status: 404,
      response: { error: { message: 'Email not found' } },
    });

    const wrapper = shallow<ResetPasswordScene>(<ResetPasswordScene />);
    wrapper.instance().onSubmitMethod(url, body, redirect).then(() => {
      expect(wrapper.find('AuthLayout').prop('message')).toBe('Email not found');
      done();
    });
  });
});
