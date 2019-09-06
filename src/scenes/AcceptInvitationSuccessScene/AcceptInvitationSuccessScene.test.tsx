import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { AcceptInvitationSuccessScene } from './AcceptInvitationSuccessScene';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';

let wrapper: ShallowWrapper;
let authLayout: ShallowWrapper;

describe('UI', () => {
  describe('Finnish translation', () => {
    beforeAll(() => {
      wrapper = shallow(<AcceptInvitationSuccessScene />);
      authLayout = wrapper.find('AuthLayout');
    });

    it('should have finnish title', () => {
      expect(authLayout.prop('title')).toBe('Salasanasi on tallennettu');
    });

    it('should have finnish subTitle', () => {
      expect(authLayout.prop('subTitle')).toBe('Tunnuksesi on valmis. Voit nyt kirjautua ohjelmaan.');
    });

    it('should have finnish login link', () => {
      const arr = authLayout.prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].text).toBe('Takaisin');
    });
  });

  describe('English translation', () => {
    beforeAll(() => {
      wrapper = shallow(<AcceptInvitationSuccessScene locale="en" />);
      authLayout = wrapper.find('AuthLayout');
    });

    it('should have english title', () => {
      expect(authLayout.prop('title')).toBe('You password is saved');
    });

    it('should have english subTitle', () => {
      expect(authLayout.prop('subTitle')).toBe('Your password is saved. You can now login.');
    });

    it('should have english login link', () => {
      const arr = authLayout.prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].text).toBe('To Login');
    });
  });

  describe('Links', () => {
    it('should have button to login screen', () => {
      const arr = authLayout.prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].to).toBe('/login');
    });
  });
});
