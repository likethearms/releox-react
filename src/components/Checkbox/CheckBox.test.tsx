import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { CheckBox } from './CheckBox';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

it('should implement default props', () => {
  const wrapper = shallow(<CheckBox name="bar" label="Foo" />);
  expect(wrapper.find('[name="bar"]').length).toBe(1);
  expect(wrapper.find('#bar-input').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(<CheckBox name="bar" id="id-foo" label="Foo" labelClass="label-class" />);
  expect(wrapper.find('#id-foo').length).toBe(1);
  expect(wrapper.find('.label-class').length).toBe(1);
});

it('should show label', () => {
  const wrapper = shallow(<CheckBox name="bar" label="Foo" />);
  expect(wrapper.find('label[children="Foo"]')).toHaveLength(1);
});

describe('Mounted test', () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <FormikFormWrapper onSubmit={() => {}} initialValues={{ bar: true }}>
        <CheckBox name="bar" label="Foo" inputClass="input-class" />
      </FormikFormWrapper>
    );
  });

  it('should inject init values', () => {
    expect(wrapper.find('FormikFormWrapperComponent').prop('initialValues')).toStrictEqual({
      bar: true,
    });
  });

  it('should set custom class to input', () => {
    expect(wrapper.find('.input-class').length).toBe(1);
  });

  it('should render', () => {
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
  });

  it('should call onChange on checbox', () => {
    const event = { target: { name: 'bar', value: false } };
    wrapper.find('input[type="checkbox"]').simulate('change', event);
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('should call custom onChange on checbox', () => {
    const spy = jest.fn();
    wrapper = mount(
      <FormikFormWrapper onSubmit={() => {}} initialValues={{ bar: true }}>
        <CheckBox name="bar" label="Foo" onChange={spy} />
      </FormikFormWrapper>
    );
    const event = { target: { name: 'bar', value: false } };
    wrapper.find('input[type="checkbox"]').simulate('change', event);
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });
});
