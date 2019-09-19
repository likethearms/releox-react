import React from 'react';
import 'jest-localstorage-mock';
import moxios from 'moxios';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { authMiddleware } from './auth-middleware';

let wrapper: ReactWrapper;

describe('authMiddleware', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    localStorage.clear();
  });

  it('should return children if token is OK and inject prop', async () => {
    moxios.stubRequest('/Members/1?access_token=2', {
      status: 200,
      response: {
        name: 'Foo',
      },
    });
    localStorage.setItem('userId', '1');
    localStorage.setItem('accessToken', '2');
    const El = authMiddleware(() => <span>Foo Bar</span>);
    wrapper = mount(
      <MemoryRouter>
        <El />
      </MemoryRouter>
    );
    const GM = wrapper.find('AuthMiddleware');
    // @ts-ignore
    await GM.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find('span[children="Foo Bar"]')).toHaveLength(1);
    expect(wrapper.find('[authenticatedUser]').prop('authenticatedUser')).toStrictEqual({
      name: 'Foo',
    });
  });

  it('should return redirect if token is invalid', async () => {
    moxios.stubRequest('/Members/1?access_token=2', {
      status: 400,
      response: {
        name: 'Foo',
      },
    });
    localStorage.setItem('userId', '1');
    localStorage.setItem('accessToken', '2');
    const El = authMiddleware(() => <span>Foo Bar</span>);
    wrapper = mount(
      <MemoryRouter>
        <El />
      </MemoryRouter>
    );
    const GM = wrapper.find('AuthMiddleware');
    // @ts-ignore
    await GM.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find('Redirect[to="/login"]')).toHaveLength(1);
  });

  it('should redirect user if missing information from localStorage', async () => {
    moxios.stubRequest('/Members/1?access_token=2', {
      status: 200,
      response: {
        name: 'Foo',
      },
    });
    localStorage.setItem('accessToken', '2');
    const El = authMiddleware(() => <span>Foo Bar</span>);
    wrapper = mount(
      <MemoryRouter>
        <El />
      </MemoryRouter>
    );
    const GM = wrapper.find('AuthMiddleware');
    // @ts-ignore
    await GM.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find('Redirect[to="/login"]')).toHaveLength(1);
  });
});
