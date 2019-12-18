import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ResetPasswordSuccessScene } from './ResetPasswordSuccessScene';

describe('ResetPasswordSuccessScene', () => {
  describe('UI Elements', () => {
    it('should have title', () => {
      const { debug, getByText } = render(<ResetPasswordSuccessScene />, { wrapper: MemoryRouter });
      debug();
      expect(getByText('Your password is changed')).toBeTruthy();
    });

    it('should have subtitle', () => {
      const { getByText } = render(<ResetPasswordSuccessScene />, { wrapper: MemoryRouter });
      expect(
        getByText(
          'Your password is now changed. Go back to login page and log in with new password.'
        )
      ).toBeTruthy();
    });

    it('should have back to login link', () => {
      const { container } = render(<ResetPasswordSuccessScene />, { wrapper: MemoryRouter });
      const links = container.getElementsByTagName('a');
      expect(links).toHaveLength(1);
      expect(links[0].innerHTML).toBe('To login');
      expect(links[0].getAttribute('href')).toBe('/login');
    });
  });
});
