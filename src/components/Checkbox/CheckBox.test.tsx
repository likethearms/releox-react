import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { Formik } from 'formik';
import { CheckBox } from './CheckBox';

it('should implement default props', () => {
  const wrapper = mount(
    <Formik onSubmit={() => {}} initialValues={{ bar: true }}>
      {() => <CheckBox name="bar" label="Foo" />}
    </Formik>
  );
  expect(wrapper.find('input[name="bar"]')).toHaveLength(1);
  expect(wrapper.find('input#bar-input')).toHaveLength(1);
  expect(wrapper.find('.form-check-input')).toHaveLength(1);
});

it('should implement props', () => {
  const wrapper = mount(
    <Formik onSubmit={() => {}} initialValues={{ bar: true }}>
      {() => <CheckBox name="bar" id="id-foo" label="Foo" labelClass="label-class" />}
    </Formik>
  );
  expect(wrapper.find('input#id-foo')).toHaveLength(1);
  expect(wrapper.find('label.label-class')).toHaveLength(1);
});

it('should show label', () => {
  const wrapper = shallow(<CheckBox name="bar" label="Foo" />);
  expect(wrapper.find('label[children="Foo"]')).toHaveLength(1);
});

describe('Mounted test', () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <Formik onSubmit={() => {}} initialValues={{ bar: true }}>
        {() => <CheckBox name="bar" label="Foo" inputClass="input-class" />}
      </Formik>
    );
  });

  it('should inject init values', () => {
    expect(wrapper.find('input').prop('checked')).toStrictEqual(true);
  });

  it('should set custom class to input', () => {
    expect(wrapper.find('.input-class')).toHaveLength(1);
  });

  it('should render', () => {
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
  });

  it('should call onChange on checbox', () => {
    const event = { target: { name: 'bar', value: false } };
    wrapper.find('input[type="checkbox"]').simulate('change', event);
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });
});
