import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { AuthForm } from './AuthForm';

let wrapper: ReactWrapper;
let spy: jest.Mock;

describe('AuthForm', () => {
  beforeAll(() => {
    spy = jest.fn();
    wrapper = mount(
      <AuthForm<any>
        placeholder="Placeholder"
        initialValues={{ foo: 'bar' }}
        buttonText="button text"
        context="Context"
        onSubmit={spy}
        inputProps={{ type: 'text', name: 'input-name' }}
      />
    );
  });

  it('should show placeholder', () => {
    expect(wrapper.find('input[placeholder="Placeholder"]')).toHaveLength(1);
  });

  it('should show label', () => {
    expect(wrapper.find('label[children="Placeholder"]')).toHaveLength(1);
  });

  it('should inject init values', () => {
    expect(wrapper.find('Formik').prop('initialValues')).toStrictEqual({
      foo: 'bar',
    });
  });

  it('should call onSubmit', () => {
    const onSubmit = wrapper.find('Formik').prop('onSubmit') as Function;
    onSubmit();
    expect(spy).toBeCalledTimes(1);
  });

  it('should show button text', () => {
    expect(wrapper.find('button[children="button text"]')).toHaveLength(1);
  });
});
