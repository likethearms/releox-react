import React from 'react';
import { Field } from 'formik';
import { shallow } from 'enzyme';
import { Input } from './Input';

it('should show input', () => {
  const wrapper = shallow(<Input label="Test" id="test" name="test-name" />);
  expect(wrapper.find(Field).length).toBe(1);
});

it('should implement custom props', () => {
  const wrapper = shallow((
    <Input
      label="Test"
      id="test"
      name="test-name"
      type="email"
      placeholder="test placeholder"
      className="custom-class"
    />
  ));
  const field = wrapper.find(Field);
  expect(wrapper.find({ children: 'Test' }).length).toBe(1);
  expect(field.prop('id')).toBe('test');
  expect(field.prop('name')).toBe('test-name');
  expect(field.prop('type')).toBe('email');
  expect(field.prop('placeholder')).toBe('test placeholder');
  expect(field.prop('className')).toBe('custom-class');
});


it('should inject default props', () => {
  const wrapper = shallow((
    <Input
      label="Test"
      name="test-name"
    />
  ));
  const field = wrapper.find(Field);
  expect(wrapper.find({ children: 'Test' }).length).toBe(1);
  expect(field.prop('id')).toBe('test-name-input');
  expect(field.prop('name')).toBe('test-name');
  expect(field.prop('type')).toBe('text');
  expect(field.prop('placeholder')).toBe('Test');
  expect(field.prop('className')).toBe('form-control');
});
