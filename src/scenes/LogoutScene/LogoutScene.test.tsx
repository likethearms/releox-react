import React from 'react';
import 'jest-localstorage-mock';
import { createWaitForElement } from 'enzyme-wait';
import { shallow, ShallowWrapper } from 'enzyme';
import moxios from 'moxios';
import { LogoutScene } from './LogoutScene';

let wrapper: ShallowWrapper<{}, {}, LogoutScene>;

describe('LogoutScene', () => {
  beforeEach(() => {
    moxios.install();
    localStorage.setItem('userId', '1');
    localStorage.setItem('accessToken', '2');
    /* eslint-disable no-underscore-dangle */
    expect(localStorage.__STORE__.userId).toBe('1');
    expect(localStorage.__STORE__.accessToken).toBe('2');
    /* eslint-enable no-underscore-dangle */
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('destroy token and localstorage when http request is 200', async () => {
    moxios.stubRequest(/./, {
      status: 200,
    });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<LogoutScene />);
    await waitForSample(wrapper);
    expect(wrapper.state('redirect')).toBe('/login');
    /* eslint-disable no-underscore-dangle */
    expect(localStorage.__STORE__.userId).toBe(undefined);
    expect(localStorage.__STORE__.accessToken).toBe(undefined);
    /* eslint-enable no-underscore-dangle */
  });

  test('destroy localstorage when localstorage is uncomplete', async () => {
    moxios.stubRequest(/./, {
      status: 200,
    });
    localStorage.removeItem('userId');
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<LogoutScene />);
    await waitForSample(wrapper);
    expect(wrapper.state('redirect')).toBe('/login');
    /* eslint-disable no-underscore-dangle */
    expect(localStorage.__STORE__.userId).toBe(undefined);
    expect(localStorage.__STORE__.accessToken).toBe(undefined);
    /* eslint-enable no-underscore-dangle */
  });


  test('destroy token and localstorage when http request is not 400', async () => {
    moxios.stubRequest(/./, {
      status: 400,
    });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<LogoutScene />);
    await waitForSample(wrapper);
    expect(wrapper.state('redirect')).toBe('/login');
    /* eslint-disable no-underscore-dangle */
    expect(localStorage.__STORE__.userId).toBe(undefined);
    expect(localStorage.__STORE__.accessToken).toBe(undefined);
    /* eslint-enable no-underscore-dangle */
  });
});
