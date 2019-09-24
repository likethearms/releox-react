import React from 'react';
import { Formik } from 'formik';
import { mount } from 'enzyme';
import { Select } from './Select';

describe('Select', () => {
  it('should inject defaults', () => {
    const wrapper = mount(
      <Formik initialValues={{}} onSubmit={(x) => x}>
        <Select label="Foo" options={[{ value: 'bar', label: 'Bar' }]} name="foo" />
      </Formik>
    );
    const el = wrapper.find('select');
    expect(wrapper.find('select')).toHaveLength(1);
    expect(el.prop('id')).toBe('foo-input');
    expect(el.prop('className')).toBe('form-control ');
  });

  it('should inject custom values', () => {
    const wrapper = mount(
      <Formik initialValues={{}} onSubmit={(x) => x}>
        <Select label="Foo" id="foo-bar" options={[{ value: 'bar', label: 'Bar' }]} name="foo" />
      </Formik>
    );
    const el = wrapper.find('select');
    expect(el.prop('id')).toBe('foo-bar');
  });
});
