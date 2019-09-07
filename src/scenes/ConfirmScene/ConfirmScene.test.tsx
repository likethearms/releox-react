import React from 'react';
import moxios from 'moxios';
import { createWaitForElement } from 'enzyme-wait';
import { shallow, ShallowWrapper } from 'enzyme';
import { ConfirmScene } from './ConfirmScene';
import { AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';

const validateTokenUrl = '/Members/confirm?uid=1&token=2';

let wrapper: ShallowWrapper;

window = Object.create(window); // eslint-disable-line
Object.defineProperty(window, 'location', { value: { search: '?uid=1&token=2' } });

describe('componentDidMount', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render title on resolve', async () => {
    moxios.stubRequest(validateTokenUrl, {
      status: 200,
      response: {},
    });
    const waitForSample = createWaitForElement('AuthLayout');
    wrapper = shallow(<ConfirmScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[title="Tunnuksesi on nyt aktivoitu"]').length).toBe(1);
  });

  it('should set error message on reject', async () => {
    moxios.stubRequest(validateTokenUrl, {
      status: 400,
      response: { error: { message: 'Error message' } },
    });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<ConfirmScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[to="/auth-error?message=Error message"]').length).toBe(1);
  });
});

describe('UI tests', () => {
  beforeAll(() => {
    moxios.install();
    moxios.stubRequest(/./, {
      status: 200,
      response: {},
    });
  });

  afterAll(() => {
    moxios.uninstall();
  });

  describe('Finnish translations', () => {
    beforeAll(async () => {
      const waitForSample = createWaitForElement('AuthLayout');
      wrapper = shallow(<ConfirmScene />);
      await waitForSample(wrapper);
    });

    it('should have finnish title', () => {
      expect(wrapper.find('[title="Tunnuksesi on nyt aktivoitu"]').length).toBe(1);
    });

    it('should have finnish subtitle', () => {
      expect(wrapper.find('[subTitle="Tunnuksesi on aktivoitu. Voit nyt jatkaa ohjelman käyttöä"]').length).toBe(1);
    });

    it('should have default link', () => {
      const arr = wrapper.find('AuthLayout').prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].text).toBe('Takaisin');
    });
  });

  describe('English translations', () => {
    beforeAll(async () => {
      const waitForSample = createWaitForElement('AuthLayout');
      wrapper = shallow(<ConfirmScene locale="en" />);
      await waitForSample(wrapper);
    });

    it('should have english title', () => {
      expect(wrapper.find('[title="Your account is now activated."]').length).toBe(1);
    });

    it('should have english subtitle', () => {
      expect(wrapper.find('[subTitle="Your account is now activated. You can now continue using application."]').length).toBe(1);
    });

    it('should have default links in english if locale is set to EN', () => {
      const arr = wrapper.find('AuthLayout').prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].text).toBe('Back');
    });
  });

  describe('Links', () => {
    it('should have button to login screen', () => {
      const arr = wrapper.find('AuthLayout').prop('links') as AuthLayoutLinkItem[];
      expect(arr[0].to).toBe('/login');
    });
  });
});
