import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ForgotSuccessScene } from './ForgotSuccessScene';

describe('ForgotSuccessScene', () => {
  describe('UI Elements', () => {
    it('should have a title message', () => {
      const { getByText } = render(<ForgotSuccessScene />, { wrapper: MemoryRouter });
      expect(getByText('Reset email is sent!')).toBeTruthy();
    });

    it('should have a text muted message', () => {
      const { getByText } = render(<ForgotSuccessScene />, { wrapper: MemoryRouter });
      expect(
        getByText(
          'Password reset link is sent to your email. Click link on your email and change password.'
        )
      ).toBeTruthy();
    });

    it('should have back to login link', () => {
      const { container } = render(<ForgotSuccessScene />, { wrapper: MemoryRouter });
      const links = container.getElementsByTagName('a');
      expect(links).toHaveLength(1);
      expect(links[0].innerHTML).toBe('Back to login');
      expect(links[0].getAttribute('href')).toBe('/login');
    });
  });
});
