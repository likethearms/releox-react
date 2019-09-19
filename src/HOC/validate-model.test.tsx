import React from 'react';
import 'jest-localstorage-mock';
import moxios from 'moxios';
import { mount, ReactWrapper } from 'enzyme';
import { validateModel } from './validate-model';
import { Input } from '../components/Input/Input';

let wrapper: ReactWrapper;

const Form = () => (
  <div>
    <Input label="Name" name="name" id="name" />
  </div>
);

window = Object.create(window); // eslint-disable-line
Object.defineProperty(window, 'location', { value: { reload: () => {} }, writable: true });

describe('validateModelMiddleware', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return children if model is OK and inject prop', () => {
    const El = validateModel(['name'], Form)(() => <span>Foo Bar</span>);
    wrapper = mount(<El authenticatedUser={{ name: 'Foo' }} />);
    expect(wrapper.find('span[children="Foo Bar"]')).toHaveLength(1);
    expect(
      wrapper
        .find('span')
        .parent()
        .prop('authenticatedUser')
    ).toStrictEqual({ name: 'Foo' });
  });

  it('should return form if model is incomplete', () => {
    const El = validateModel(['name'], Form)(() => <span>Foo Bar</span>);
    wrapper = mount(<El authenticatedUser={{}} />);
    expect(wrapper.find('Input')).toHaveLength(1);
  });

  it('submit success', () => {
    moxios.stubRequest(/./, {
      status: 200,
      response: {},
    });
    const El = validateModel(['name'], Form)(() => <span>Foo Bar</span>);
    wrapper = mount(<El authenticatedUser={{}} />);
    const onSubmit = wrapper.find('FormikFormWrapperComponent').prop('onSubmit') as Function;
    onSubmit({});
    expect(wrapper.find('ValidateModel').state('message')).toBe('');
  });

  it('submit error', async () => {
    moxios.stubRequest(/./, {
      status: 400,
      response: { error: { message: 'Foo bar' } },
    });
    const El = validateModel(['name'], Form)(() => <span>Foo Bar</span>);
    wrapper = mount(<El authenticatedUser={{}} />);
    const onSubmit = wrapper.find('FormikFormWrapperComponent').prop('onSubmit') as Function;
    await onSubmit({});
    expect(wrapper.find('ValidateModel').state('message')).toBe('Foo bar');
  });
});
