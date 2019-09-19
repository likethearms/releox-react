import React from 'react';
import moxios from 'moxios';
import { createWaitForElement } from 'enzyme-wait';
import { ShallowWrapper, shallow } from 'enzyme';
import { AbstractAuthOneInputScene } from '../../components/AbstractAuthOneInputScene/AbstractAuthOneInputScene';
import { AcceptInvitationScene } from './AcceptInvitationScene';

let wrapper: ShallowWrapper<{}, {}, AbstractAuthOneInputScene<{}, {}>>;
const validateTokenUrl = '/Members/validate-invitation-token?uid=1&invitation_token=2';

window = Object.create(window); // eslint-disable-line
const search = '?uid=1&invitation_token=2';
Object.defineProperty(window, 'location', { value: { search }, writable: true });

describe('componentDidMount', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('component show AuthLayout if invitation token is valid', async () => {
    moxios.stubRequest(validateTokenUrl, {
      status: 200,
      response: {},
    });
    const waitForSample = createWaitForElement('AuthLayout');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[title="Viimeistele tunnuksesi"]').length).toBe(1);
  });

  test('component redirect to error scene if invitation token is invalid', async () => {
    moxios.stubRequest(validateTokenUrl, {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[to="/auth-error?message=Foo bar"]').length).toBe(1);
  });
});

describe('Submit', () => {
  let onSubmit: Function;
  const acceptInvitationUrl = '/Members/accept-invitation?invitation_token=2&uid=1';

  beforeEach(async () => {
    moxios.install();
    moxios.stubRequest(validateTokenUrl, {
      status: 200,
      response: {},
    });
    const waitForSample = createWaitForElement('AuthLayout');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('AuthForm').length).toBe(1);
    onSubmit = wrapper.find('AuthForm').prop('onSubmit') as Function;
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('onSubmit success', async () => {
    moxios.stubRequest(acceptInvitationUrl, {
      status: 200,
      response: {},
    });
    await onSubmit({ password: 'password' });
    expect(wrapper.find('[to="/accept-invitation-success"]').length).toBe(1);
  });

  test('onSubmit error', async () => {
    moxios.stubRequest(acceptInvitationUrl, {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });
    await onSubmit({ password: 'password' });
    expect(wrapper.find('[message="Foo bar"]').length).toBe(1);
  });
});

describe('Test information errors', () => {
  afterAll(() => {
    Object.defineProperty(window, 'location', { value: { search } });
  });

  test('error shown if missing uid', async () => {
    Object.defineProperty(window, 'location', { value: { search: '?invitation_token=2' } });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[to="/auth-error?message=Missing information"]').length).toBe(1);
  });

  test('error shown if missing invitation_token', async () => {
    Object.defineProperty(window, 'location', { value: { search: '?uid=1' } });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[to="/auth-error?message=Missing information"]').length).toBe(1);
  });

  test('error shown if uid is array ', async () => {
    Object.defineProperty(window, 'location', {
      value: { search: '?uid=1&uid=3&invitation_token=2' },
    });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[to="/auth-error?message=Information is on wrong format"]').length).toBe(
      1
    );
  });

  test('error shown if invitation_token is array ', async () => {
    Object.defineProperty(window, 'location', {
      value: { search: '?uid=1&invitation_token=3&invitation_token=2' },
    });
    const waitForSample = createWaitForElement('Redirect');
    wrapper = shallow(<AcceptInvitationScene />);
    await waitForSample(wrapper);
    expect(wrapper.find('[to="/auth-error?message=Information is on wrong format"]').length).toBe(
      1
    );
  });
});
