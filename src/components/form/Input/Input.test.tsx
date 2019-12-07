import React from 'react';
import { Field, Formik } from 'formik';
import { shallow, mount } from 'enzyme';
import { Input } from './Input';

it('should show input', () => {
  const wrapper = shallow(<Input label="Test" id="test" name="test-name" />);
  expect(wrapper.find(Field)).toHaveLength(1);
});

it('should show default inline input', () => {
  const wrapper = shallow(<Input inline name="foo" label="Foo" />);
  expect(wrapper.find('.row')).toHaveLength(1);
  expect(wrapper.find('label.col-md-4')).toHaveLength(1);
  expect(wrapper.find('.col-md-8')).toHaveLength(1);
});

it('should show default inline input with custom width and label on right', () => {
  const comp = <Input inline name="foo" label="Foo" inlineLabelWidth={8} labelClass="text-right" />;
  const wrapper = shallow(comp);
  expect(wrapper.find('.row')).toHaveLength(1);
  expect(wrapper.find('label.col-md-8')).toHaveLength(1);
  expect(wrapper.find('.col-md-4')).toHaveLength(1);
  expect(wrapper.find('.text-right')).toHaveLength(1);
});

it('should implement custom props', () => {
  const comp = (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Input
          label="Test"
          id="test"
          name="test-name"
          type="email"
          placeholder="test placeholder"
          className="custom-class"
        />
      )}
    </Formik>
  );
  const wrapper = mount(comp);
  const field = wrapper.find('input');
  expect(wrapper.find({ children: 'Test' })).toHaveLength(1);
  expect(field.prop('id')).toBe('test');
  expect(field.prop('name')).toBe('test-name');
  expect(field.prop('type')).toBe('email');
  expect(field.prop('placeholder')).toBe('test placeholder');
  expect(field.prop('className')).toBe('custom-class');
});

it('should inject default props', () => {
  const wrapper = mount(
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => <Input label="Test" name="test-name" />}
    </Formik>
  );
  const field = wrapper.find('input');
  expect(wrapper.find({ children: 'Test' })).toHaveLength(1);
  expect(field.prop('id')).toBe('test-name-input');
  expect(field.prop('name')).toBe('test-name');
  expect(field.prop('type')).toBe('text');
  expect(field.prop('placeholder')).toBe('Test');
  expect(field.prop('className')).toBe('form-control ');
});
