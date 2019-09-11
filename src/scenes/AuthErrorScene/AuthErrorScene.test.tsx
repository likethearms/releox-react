import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import { AuthErrorScene } from './AuthErrorScene';

let wrapper: ShallowWrapper;
let authLayout: ShallowWrapper;

window = Object.create(window); // eslint-disable-line
Object.defineProperty(window, 'location', { value: { search: '?message=FooBar' }, writable: true });

describe('UI', () => {
  describe('Finnish translation', () => {
    beforeAll(() => {
      wrapper = shallow(<AuthErrorScene />);
      authLayout = wrapper.find('AuthLayout');
    });

    it('should have finnish title', () => {
      expect(authLayout.prop('title')).toBe('Oops... Tapahtui virhe');
    });

    it('should have finnish subTitle', () => {
      expect(authLayout.prop('subTitle')).toBe('FooBar');
    });

    it('should have finnish login link', () => {
      const arr = authLayout.prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].text).toBe('Kirjautumissivulle');
    });
  });

  describe('English translation', () => {
    beforeAll(() => {
      wrapper = shallow(<AuthErrorScene locale="en" />);
      authLayout = wrapper.find('AuthLayout');
    });

    it('should have english title', () => {
      expect(authLayout.prop('title')).toBe('Oops... There was an error');
    });

    it('should have english subTitle', () => {
      expect(authLayout.prop('subTitle')).toBe('FooBar');
    });

    it('should have english login link', () => {
      const arr = authLayout.prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].text).toBe('To login');
    });
  });

  describe('Links', () => {
    it('should have button to login screen', () => {
      const arr = authLayout.prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].to).toBe('/login');
    });
  });
});
