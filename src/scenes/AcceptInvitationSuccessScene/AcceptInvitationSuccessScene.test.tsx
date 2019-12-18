import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AcceptInvitationSuccessScene } from './AcceptInvitationSuccessScene';

describe('AcceptInvitationSuccessScene', () => {
  describe('UI Element', () => {
    it('should have a title', () => {
      const { debug, getByText } = render(<AcceptInvitationSuccessScene />, {
        wrapper: MemoryRouter,
      });
      debug();
      expect(getByText('Your password is saved')).toBeTruthy();
    });

    it('should have a subTitle', () => {
      const { getByText } = render(<AcceptInvitationSuccessScene />, { wrapper: MemoryRouter });
      expect(getByText('Your password is saved. You can now login.')).toBeTruthy();
    });

    it('should have a link to login', () => {
      const { container } = render(<AcceptInvitationSuccessScene />, { wrapper: MemoryRouter });
      const links = container.getElementsByTagName('a');
      expect(links).toHaveLength(1);
      expect(links[0].innerHTML).toBe('To Login');
      expect(links[0].getAttribute('href')).toBe('/login');
    });
  });
});
