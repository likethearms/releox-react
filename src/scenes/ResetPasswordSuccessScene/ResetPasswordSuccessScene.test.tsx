import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResetPasswordSuccessScene } from './ResetPasswordSuccessScene';

describe('UI tests', () => {
  describe('Finnish translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<ResetPasswordSuccessScene />);
    });

    it('should have finnish title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Salasanasi on vaihdettu');
    });

    it('should have finnish subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Salasanasi on vaihdettu onnistuneesti. Voit nyt palata kirjautumissivulle ja kirjautua uudella salasanalla');
    });
  });

  describe('English translations', () => {
    let wrapper: ShallowWrapper;
    beforeAll(() => {
      wrapper = shallow(<ResetPasswordSuccessScene locale="en" />);
    });

    it('should have english title', () => {
      const word = wrapper.find('AuthLayout').prop('title');
      expect(word).toBe('Your password is changed');
    });

    it('should have english subtitle', () => {
      const word = wrapper.find('AuthLayout').prop('subTitle');
      expect(word).toBe('Your password is now changed. Go back to login page and log in with new password.');
    });
  });

  describe('getLinks test', () => {
    it('should have default links', () => {
      const wrapper = shallow(<ResetPasswordSuccessScene />);
      const links = wrapper.find('AuthLayout').prop('links');
      expect(links).toEqual([
        {
          to: '/login',
          id: 'login-link',
          text: 'Kirjautumissivulle',
        },
      ]);
    });

    it('should have default links in english if locale is set to EN', () => {
      const wrapper = shallow(<ResetPasswordSuccessScene locale="en" />);
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
