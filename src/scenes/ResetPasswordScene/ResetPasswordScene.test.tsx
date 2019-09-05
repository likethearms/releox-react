import React from 'react';
import moxios from 'moxios';
import { createWaitForElement } from 'enzyme-wait';
import { shallow, ShallowWrapper } from 'enzyme';
import ResetPasswordScene from './ResetPasswordScene';
import { AbstractAuthOneInputSceneProps } from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';

window = Object.create(window);
Object.defineProperty(window, 'location', { value: { search: '' }, writable: true });

describe('Abstract methods', () => {
  let wrapper: ShallowWrapper<AbstractAuthOneInputSceneProps, any, ResetPasswordScene>;
  beforeAll(() => {
    wrapper = shallow(<ResetPasswordScene />);
  });

  test('getPostUrl should return correct value', () => {
    const url = wrapper.instance().getPostUrl();
    expect(url).toBe('undefined/Members/reset-password');
  });

  test('getRedirectUrl should return correct value', () => {
    const url = wrapper.instance().getRedirectUrl();
    expect(url).toBe('/reset-password-success');
  });
});

describe('Errors', () => {
  let wrapper: ShallowWrapper<AbstractAuthOneInputSceneProps, any, ResetPasswordScene>;

  beforeAll(() => {
    wrapper = shallow(<ResetPasswordScene />);
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { value: { search: '' } });
  });

  it('should return error when no user object or access token is not present', () => {
    expect(wrapper.state().redirect).toBe('/auth-error?message=Missing User Object or Access Token');
  });

  it('should return error when no user object is not present', () => {
    const url = "?user=xx";
    Object.defineProperty(window, 'location', { value: { search: url } });
    expect(wrapper.state().redirect).toBe('/auth-error?message=Missing User Object or Access Token');
  });

  it('should return error when no access token is not present', () => {
    const url = "?access_token=xxx";
    Object.defineProperty(window, 'location', { value: { search: url } });
    window.location.search = url;
    expect(wrapper.state().redirect).toBe('/auth-error?message=Missing User Object or Access Token');
  });
});

describe('UI tests', () => {
  beforeAll(() => {
    const url = "?user=xx&access_token=xxx";
    Object.defineProperty(window, 'location', { value: { search: url } });
    moxios.install();
    moxios.stubRequest(/./, {
      status: 200,
      response: { error: { message: 'Email not found' } },
    });
  });

  afterAll(() => {
    moxios.uninstall();
  });

  describe('Finnish translations', () => {
    let wrapper: ShallowWrapper;

    beforeAll(async () => {
      const waitForSample = createWaitForElement('AuthLayout');
      wrapper = shallow(<ResetPasswordScene />);
      await waitForSample(wrapper);
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

    beforeAll(async () => {
      const waitForSample = createWaitForElement('AuthLayout');
      wrapper = shallow(<ResetPasswordScene locale="en" />);
      await waitForSample(wrapper);
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
  let wrapper: ShallowWrapper<AbstractAuthOneInputSceneProps, any, ResetPasswordScene>;
  const body = {
    email: 'email@email.com',
  };

  beforeEach(async () => {
    moxios.install();
    moxios.stubRequest(/undefined\/Members\/xx/, {
      status: 200,
      response: {},
    });
    const waitForSample = createWaitForElement('AuthLayout');
    wrapper = shallow(<ResetPasswordScene />);
    await waitForSample(wrapper);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should redirect when submit success', (done) => {
    moxios.stubRequest(/undefined\/Members\/(reset|logout)/, {
      status: 200,
    });
    const onSubmit = wrapper.find('AuthForm').prop('onSubmit') as Function;
    onSubmit(body).then(() => {
      expect(wrapper.state().redirect).toBe('/reset-password-success');
      done();
    });
  });

  it('should set error message to message state', (done) => {
    moxios.stubRequest(/undefined\/Members\/(reset|logout)/, {
      status: 404,
      response: { error: { message: 'Email not found' } },
    });
    const onSubmit = wrapper.find('AuthForm').prop('onSubmit') as Function;
    onSubmit(body).then(() => {
      expect(wrapper.find('AuthLayout').prop('message')).toBe('Email not found');
      done()
    });
  });
});
