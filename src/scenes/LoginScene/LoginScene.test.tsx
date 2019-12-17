import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import 'jest-localstorage-mock';
import moxios from 'moxios';
import { LoginScene } from './LoginScene';

describe('LoginScene', () => {
  describe('UI Elemnts', () => {
    it('should have a submit button', () => {
      const { container } = render(<LoginScene />, { wrapper: MemoryRouter });
      const buttons = container.getElementsByTagName('button');
      expect(buttons).toHaveLength(1);
      expect(buttons[0].innerHTML).toBe('Login');
    });

    it('should have a forgot password link', () => {
      const { container } = render(<LoginScene />, { wrapper: MemoryRouter });
      const links = container.getElementsByTagName('a');
      expect(links).toHaveLength(1);
      expect(links[0].innerHTML).toBe('Forgot password?');
      expect(links[0].getAttribute('href')).toBe('/forgot');
    });

    it('should have a password input', () => {
      const { container } = render(<LoginScene />, { wrapper: MemoryRouter });
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('placeholder')).toBe('Password');
    });

    it('should have an email input', () => {
      const { container } = render(<LoginScene />, { wrapper: MemoryRouter });
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('placeholder')).toBe('Email');
      expect(input?.getAttribute('name')).toBe('email');
    });
  });

  describe('props', () => {
    it('loginFieldName', () => {
      const { container } = render(<LoginScene loginFieldName="username" />, {
        wrapper: MemoryRouter,
      });
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('placeholder')).toBe('Username');
      expect(input?.getAttribute('name')).toBe('username');
    });

    it('showForgotPasswordLink', () => {
      const { container } = render(<LoginScene showForgotPasswordLink={false} />, {
        wrapper: MemoryRouter,
      });
      const links = container.getElementsByTagName('a');
      expect(links).toHaveLength(0);
    });

    it('titleBlock', () => {
      const { getByText } = render(<LoginScene titleBlock="Foo bar" />, {
        wrapper: MemoryRouter,
      });
      expect(getByText('Foo bar')).toBeTruthy();
    });

    xit('onError', () => {});
    xit('onSubmit', () => {});
  });

  describe('onSubmit', () => {
    xit('should handle success login correctly', () => {});
    xit('should show error if login fails', () => {});
  });

  describe('getLinks', () => {
    xit('should have default links', () => {});
    xit('should hide forgot link if showForgotPasswordLink is false', () => {});
  });

  describe('releox-options', () => {
    xit('should show register link if releox option showRegisterLink is set to true', () => {});
  });
});

// describe('onSubmit', () => {
//   it('should call onSubmit', () => {
//     const onSubmit = jest.fn();
//     const wrapper = shallow(<LoginScene onSubmit={onSubmit} />);
//     const onSubmitProp = wrapper.find('Formik').prop('onSubmit') as Function;
//     onSubmitProp();
//     expect(onSubmit).toBeCalledTimes(1);
//   });
// });

// describe('loginFieldName', () => {
//   it('should set email value to input name prop by default', () => {
//     const w = mount(
//       <MemoryRouter>
//         <LoginScene />
//       </MemoryRouter>
//     );
//     expect(w.find('input[name="email"]')).toHaveLength(1);
//   });

//   it('should set username value to input name prop', () => {
//     const w = mount(
//       <MemoryRouter>
//         <LoginScene loginFieldName="username" />
//       </MemoryRouter>
//     );
//     expect(w.find('input[name="username"]')).toHaveLength(1);
//   });
// });

// describe('UI tests', () => {
//   it('should have custom title block', () => {
//     const wrapper = shallow(<LoginScene titleBlock={<h1>Service title</h1>} />);
//     const title = wrapper.find('AuthLayout').prop('titleBlock');
//     expect(title).toStrictEqual(<h1>Service title</h1>);
//   });

//   describe('Finnish translations', () => {
//     let wrapper: ReactWrapper;
//     beforeAll(() => {
//       wrapper = mount(
//         <MemoryRouter>
//           <LoginScene />
//         </MemoryRouter>
//       );
//     });

//     it('should have finnish title', () => {
//       const word = wrapper.find('AuthLayout').prop('title');
//       expect(word).toBe('Kirjaudu');
//     });

//     it('should have finnish subtitle', () => {
//       const word = wrapper.find('AuthLayout').prop('subTitle');
//       expect(word).toBe('Täytä tiedot ja kirjaudu sisään');
//     });

//     it('should have finnish email placeholder', () => {
//       const word = wrapper.find('[htmlFor="LoginScene-email-input"]').text();
//       expect(word).toBe('Sähköposti');
//     });

//     it('should have finnish username placeholder', () => {
//       const w = mount(
//         <MemoryRouter>
//           <LoginScene loginFieldName="username" />
//         </MemoryRouter>
//       );
//       const word = w.find('[htmlFor="LoginScene-username-input"]').text();
//       expect(word).toBe('Käyttäjänimi');
//     });

//     it('should have finnish password placeholder', () => {
//       const word = wrapper.find('[htmlFor="LoginScene-password-input"]').text();
//       expect(word).toBe('Salasana');
//     });

//     it('should have finnish button text', () => {
//       const word = wrapper.find('ButtonComponent').prop('children');
//       expect(word).toBe('Kirjaudu');
//     });
//   });

//   describe('English translations', () => {
//     let wrapper: ReactWrapper;
//     beforeAll(() => {
//       wrapper = mount(
//         <MemoryRouter>
//           <LoginScene locale="en" />
//         </MemoryRouter>
//       );
//     });

//     it('should have english title', () => {
//       const word = wrapper.find('AuthLayout').prop('title');
//       expect(word).toBe('Login');
//     });

//     it('should have english subtitle', () => {
//       const word = wrapper.find('AuthLayout').prop('subTitle');
//       expect(word).toBe('Fill form and login');
//     });

//     it('should have english email placeholder', () => {
//       const word = wrapper.find('[htmlFor="LoginScene-email-input"]').text();
//       expect(word).toBe('Email');
//     });

//     it('should have english username placeholder', () => {
//       const w = mount(
//         <MemoryRouter>
//           <LoginScene loginFieldName="username" locale="en" />
//         </MemoryRouter>
//       );
//       const word = w.find('[htmlFor="LoginScene-username-input"]').text();
//       expect(word).toBe('Username');
//     });

//     it('should have english password placeholder', () => {
//       const word = wrapper.find('[htmlFor="LoginScene-password-input"]').text();
//       expect(word).toBe('Password');
//     });

//     it('should have english button text', () => {
//       const word = wrapper.find('ButtonComponent').prop('children');
//       expect(word).toBe('Login');
//     });
//   });

//   describe('getLinks test', () => {
//     it('should have default links', () => {
//       const wrapper = shallow(<LoginScene />);
//       const links = wrapper.find('AuthLayout').prop('links');
//       expect(links).toEqual([
//         {
//           to: '/forgot',
//           id: 'LoginScene-forgot-link',
//           text: 'Unohditko salasanasi?',
//         },
//       ]);
//     });

//     it('should hide forgot link if showForgotPasswordLink is false', () => {
//       const wrapper = shallow(<LoginScene showForgotPasswordLink={false} />);
//       const links = wrapper.find('AuthLayout').prop('links');
//       expect(links).toEqual([]);
//     });

//     it('should have default links in english', () => {
//       const wrapper = shallow(<LoginScene locale="en" />);
//       const links = wrapper.find('AuthLayout').prop('links');
//       expect(links).toEqual([
//         {
//           to: '/forgot',
//           id: 'LoginScene-forgot-link',
//           text: 'Forgot password?',
//         },
//       ]);
//     });

//     it('should show register link if showRegisterLink is set to true', () => {
//       window.RELEOX_OPTIONS = { showRegisterLink: true };
//       const wrapper = shallow(<LoginScene />);
//       const links = wrapper.find('AuthLayout').prop('links');
//       expect(links).toEqual([
//         {
//           to: '/forgot',
//           id: 'LoginScene-forgot-link',
//           text: 'Unohditko salasanasi?',
//         },
//         {
//           to: '/register',
//           id: 'LoginScene-register-link',
//           text: 'Oletko uusi? Luo tunnus!',
//         },
//       ]);
//     });

//     it('should show register link in english if showRegisterLink is set to true and locale is set to EN', () => {
//       window.RELEOX_OPTIONS = { showRegisterLink: true };
//       const wrapper = shallow(<LoginScene locale="en" />);
//       const links = wrapper.find('AuthLayout').prop('links');
//       expect(links).toEqual([
//         {
//           to: '/forgot',
//           id: 'LoginScene-forgot-link',
//           text: 'Forgot password?',
//         },
//         {
//           to: '/register',
//           id: 'LoginScene-register-link',
//           text: 'New? Create new account!',
//         },
//       ]);
//     });
//   });
// });

// describe('moxios tests', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   const wrapper = shallow<any, any, typeof LoginScene>(<LoginScene />);
//   const body = {
//     email: 'email@email.com',
//     password: 'password',
//   };

//   it('should redirect when submit success', (done) => {
//     moxios.stubRequest('/Members/login', {
//       status: 200,
//       response: { id: 2, userId: 1 },
//     });

//     wrapper
//       .instance()
//       .onSubmit(body)
//       .then(() => {
//         expect(wrapper.state('redirect')).toBe('/');
//         expect(localStorage.__STORE__.userId).toBe('1'); // eslint-disable-line no-underscore-dangle
//         expect(localStorage.__STORE__.accessToken).toBe('2'); // eslint-disable-line no-underscore-dangle
//         done();
//       });
//   });

//   it('should set error message to message state', (done) => {
//     moxios.stubRequest('/Members/login', {
//       status: 400,
//       response: { error: { message: 'Foo bar' } },
//     });

//     const w = shallow<any, any, typeof LoginScene>(<LoginScene />);
//     w.instance()
//       .onSubmit(body)
//       .then(() => {
//         expect(w.state('message')).toBe('Foo bar');
//         done();
//       });
//   });

//   it('should call custom error handler if errorHander is passed to component', (done) => {
//     const onError = jest.fn();
//     moxios.stubRequest('/Members/login', {
//       status: 400,
//       response: { error: { message: 'Foo bar' } },
//     });

//     const w = shallow<any, any, typeof LoginScene>(<LoginScene onError={onError} />);
//     w.instance()
//       .onSubmit(body)
//       .then(() => {
//         expect(onError).toBeCalledTimes(1);
//         done();
//       });
//   });
// });
