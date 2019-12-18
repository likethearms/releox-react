import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { AuthErrorScene } from './AuthErrorScene';

describe('AuthErrorScene', () => {
  describe('Ui Elements', () => {
    it('should have a title', () => {
      const { getByText } = render(<AuthErrorScene />, { wrapper: MemoryRouter });
      expect(getByText('Oops... There was an error')).toBeTruthy();
    });

    it('should have a subTitle', () => {
      const { getByText } = render(<AuthErrorScene />, { wrapper: MemoryRouter });
      expect(getByText("We couldn't find reason for an error.")).toBeTruthy();
    });

    it('should have to login link', () => {
      const { container } = render(<AuthErrorScene />, { wrapper: MemoryRouter });
      const links = container.getElementsByTagName('a');
      expect(links).toHaveLength(1);
      expect(links[0].innerHTML).toBe('To login');
      expect(links[0].getAttribute('href')).toBe('/login');
    });
    xit('should show customs error', () => {});
  });
});
