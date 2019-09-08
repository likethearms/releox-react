import React from 'react';
import 'jest-localstorage-mock';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { guestMiddleware } from './guest-middleware';

let wrapper: ReactWrapper;

describe('guestMiddleware', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should redirect user to home route if localstorage has user id and access token', async () => {
    localStorage.setItem('userId', '1');
    localStorage.setItem('accessToken', '2');
    const El = guestMiddleware(() => <span>Foo Bar</span>);
    wrapper = mount(<MemoryRouter><El /></MemoryRouter>);
    const GM = wrapper.find('GuestMiddleware');
    // @ts-ignore
    await GM.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find('Redirect[to="/"]')).toHaveLength(1);
  });

  it('should redirect user to home route if localstorage has user id and access token', async () => {
    localStorage.setItem('accessToken', '2');
    const El = guestMiddleware(() => <span>Foo Bar</span>);
    wrapper = mount(<MemoryRouter><El /></MemoryRouter>);
    const GM = wrapper.find('GuestMiddleware');
    // @ts-ignore
    await GM.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find('span[children="Foo Bar"]')).toHaveLength(1);
  });
});
