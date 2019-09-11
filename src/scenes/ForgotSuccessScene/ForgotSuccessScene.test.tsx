import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ForgotSuccessScene } from './ForgotSuccessScene';

let wrapper: ShallowWrapper;

describe('UI tests', () => {
  describe('Finnish translations', () => {
    beforeAll(() => {
      wrapper = shallow(<ForgotSuccessScene />);
    });

    it('should have finnish title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Salasanan nollauspyyntö lähetetty!');
    });

    it('should have finnish subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Salasanan nollauslinkki on lähetetty sähköpostiisi! Avaa sähköpostissa oleva linkki ja vaihda salasana.');
    });
  });

  describe('English translations', () => {
    beforeAll(() => {
      wrapper = shallow(<ForgotSuccessScene locale="en" />);
    });

    it('should have english title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Reset email is sent!');
    });

    it('should have english subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Password reset link is sent to your email. Click link on your email and change password.');
    });
  });

  describe('getLinks test', () => {
    it('should have default links', () => {
      wrapper = shallow(<ForgotSuccessScene />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/login',
          id: 'login-link',
          text: 'Takaisin kirjautumissivulle',
        },
      ]);
    });

    it('should have default links in english if locale is set to EN', () => {
      wrapper = shallow(<ForgotSuccessScene locale="en" />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/login',
          id: 'login-link',
          text: 'Back to login',
        },
      ]);
    });
  });
});
