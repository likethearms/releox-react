import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import 'jest-localstorage-mock';
import moxios from 'moxios';
import { LoginScene } from './LoginScene';

describe('onSubmit', () => {
  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginScene onSubmit={onSubmit} />);
    const onSubmitProp = wrapper.find('FormikFormWrapperComponent').props().onSubmit as Function;
    onSubmitProp();
    expect(onSubmit).toBeCalledTimes(1);
  });
});


describe('loginFieldName', () => {
  it('should set email value to input name prop by default', () => {
    const w = shallow(<LoginScene />);
    expect(w.find('[name="email"]')).toHaveLength(1);
  });

  it('should set username value to input name prop', () => {
    const w = shallow(<LoginScene loginFieldName="username" />);
    expect(w.find('[name="username"]')).toHaveLength(1);
  });
});

describe('UI tests', () => {
  it('should have custom title block', () => {
    const wrapper = shallow((
      <LoginScene titleBlock={<h1>Service title</h1>} />
    ));
    const title = wrapper.find('AuthLayout').prop('titleBlock');
    expect(title).toStrictEqual(<h1>Service title</h1>);
  });

  describe('Finnish translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<LoginScene />);
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

    it('should have finnish username placeholder', () => {
      const w = shallow(<LoginScene loginFieldName="username" />);
      const word = w.find('[name="username"]').prop('label');
      expect(word).toBe('Käyttäjänimi');
    });

    it('should have finnish password placeholder', () => {
      const word = wrapper.find('[name="password"]').prop('label');
      expect(word).toBe('Salasana');
    });

    it('should have finnish button text', () => {
      const word = wrapper.find('ButtonComponent').prop('children');
      expect(word).toBe('Kirjaudu');
    });
  });

  describe('English translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<LoginScene locale="en" />);
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

    it('should have english username placeholder', () => {
      const w = shallow(<LoginScene loginFieldName="username" locale="en" />);
      const word = w.find('[name="username"]').prop('label');
      expect(word).toBe('Username');
    });

    it('should have english password placeholder', () => {
      const word = wrapper.find('[name="password"]').prop('label');
      expect(word).toBe('Password');
    });

    it('should have english button text', () => {
      const word = wrapper.find('ButtonComponent').prop('children');
      expect(word).toBe('Login');
    });
  });

  describe('getLinks test', () => {
    it('should have default links', () => {
      const wrapper = shallow(<LoginScene />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/forgot',
          id: 'LoginScene-forgot-link',
          text: 'Unohditko salasanasi?',
        },
      ]);
    });

    it('should hide forgot link if showForgotPasswordLink is false', () => {
      const wrapper = shallow(<LoginScene showForgotPasswordLink={false} />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([]);
    });

    it('should have default links in english', () => {
      const wrapper = shallow(<LoginScene locale="en" />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/forgot',
          id: 'LoginScene-forgot-link',
          text: 'Forgot password?',
        },
      ]);
    });

    it('should show register link if showRegisterLink is set to true', () => {
      window.RELEOX_OPTIONS = { showRegisterLink: true };
      const wrapper = shallow(<LoginScene />);
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
        },
      ]);
    });

    it('should show register link in english if showRegisterLink is set to true and locale is set to EN', () => {
      window.RELEOX_OPTIONS = { showRegisterLink: true };
      const wrapper = shallow(<LoginScene locale="en" />);
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
        },
      ]);
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

  const wrapper = shallow<any, any, typeof LoginScene>(<LoginScene />);
  const body = {
    email: 'email@email.com',
    password: 'password',
  };

  it('should redirect when submit success', (done) => {
    moxios.stubRequest('/Members/login', {
      status: 200,
      response: { id: 2, userId: 1 },
    });

    wrapper.instance().onSubmit(body).then(() => {
      expect(wrapper.state('redirect')).toBe('/');
      expect(localStorage.__STORE__.userId).toBe('1'); // eslint-disable-line no-underscore-dangle
      expect(localStorage.__STORE__.accessToken).toBe('2'); // eslint-disable-line no-underscore-dangle
      done();
    });
  });

  it('should set error message to message state', (done) => {
    moxios.stubRequest('/Members/login', {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });

    const w = shallow<any, any, typeof LoginScene>(<LoginScene />);
    w.instance().onSubmit(body).then(() => {
      expect(w.state('message')).toBe('Foo bar');
      done();
    });
  });

  it('should call custom error handler if errorHander is passed to component', (done) => {
    const onError = jest.fn();
    moxios.stubRequest('/Members/login', {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });

    const w = shallow<any, any, typeof LoginScene>(<LoginScene onError={onError} />);
    w.instance().onSubmit(body).then(() => {
      expect(onError).toBeCalledTimes(1);
      done();
    });
  });
});
