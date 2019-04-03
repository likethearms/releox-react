import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';
import { Field } from 'formik';
import { InputTypes } from '../../typings';

it('should show input', () => {
  const wrapper = shallow(<Input label="Test" id="test" name="test-name" />);
  expect(wrapper.find(Field).length).toBe(1);
});

it('should fill default props', () => {
  const wrapper = shallow(<Input label="Test" id="test" name="test-name" />);
  const field = wrapper.find(Field);
  expect(field.prop('component')).toBe('input');
  expect(field.prop('className')).toBe('form-control');
  expect(field.prop('type')).toBe('text');
});

it('should implement custom props', () => {
  const wrapper = shallow((
    <Input
      label="Test"
      id="test"
      name="test-name"
      type={InputTypes.EMAIL}
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
