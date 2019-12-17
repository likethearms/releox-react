import React from 'react';
import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import { Router } from 'react-router-dom';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Switch, Route } from 'react-router';
import { ConfirmScene } from './ConfirmScene';
import { routes } from '../../routes';
import { AuthErrorScene } from '../AuthErrorScene/AuthErrorScene';

const validateTokenUrl = '/Members/confirm?uid=1&token=2';

const withAuthErrorRouter = (Component: any) => {
  const history = createMemoryHistory({ initialEntries: ['/?uid=1&token=2'] });
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Component} />
        <Route exact path={routes.ERROR} component={AuthErrorScene} />
      </Switch>
    </Router>
  );
};

describe('ConfirmScene', () => {
  beforeEach(() => {
    cleanup();
    moxios.install();
  });

  afterEach(() => {
    cleanup();
    moxios.uninstall();
  });

  it('should show message if API return 2xx', async () => {
    moxios.stubRequest(validateTokenUrl, {
      status: 200,
      response: {},
    });
    let getByText: Function;
    await act(async () => {
      ({ getByText } = render(withAuthErrorRouter(ConfirmScene)));
    });
    await waitForElement(() => getByText('Your account is now activated.'));
  });

  it('should redirect to auth error page if response is not 2xx', async () => {
    moxios.stubRequest(validateTokenUrl, {
      status: 400,
      response: { error: { message: 'Error message' } },
    });
    await act(async () => {
      const { queryByText, queryAllByText } = render(withAuthErrorRouter(ConfirmScene));
      await waitForElement(() => queryByText('Oops... There was an error'));
      expect(queryAllByText(/Error message/)).toBeTruthy();
    });
  });
});
