import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import { NativeSelect } from './NativeSelect';

it('should show NativeSelect', () => {
  const wrapper = shallow(
    <NativeSelect
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      selectedOption=""
      onChange={() => {}}
      label="Test"
      id="test"
      name="test-name"
    />
  );
  expect(wrapper.find(Select).length).toBe(1);
});

it('should show default inline NativeSelect', () => {
  const wrapper = shallow(
    <NativeSelect
      inline
      name="foo"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      selectedOption="chocolate"
      onChange={() => {}}
      label="Foo"
    />
  );
  expect(wrapper.find('.row').length).toBe(1);
  expect(wrapper.find('label.col-md-4').length).toBe(1);
  expect(wrapper.find('.col-md-8').length).toBe(1);
});

it('should show default inline NativeSelect with custom width and label on right', () => {
  const comp = (
    <NativeSelect
      inline
      name="foo"
      label="Foo"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      selectedOption="chocolate"
      onChange={() => {}}
      inlineLabelWidth={8}
      labelClass="text-right"
    />
  );
  const wrapper = shallow(comp);
  expect(wrapper.find('.row').length).toBe(1);
  expect(wrapper.find('label.col-md-8').length).toBe(1);
  expect(wrapper.find('.col-md-4').length).toBe(1);
  expect(wrapper.find('.text-right').length).toBe(1);
});

it('should implement custom props', () => {
  const comp = (
    <NativeSelect
      label="Test"
      id="test"
      name="test-name"
      placeholder="test placeholder"
      className="custom-class"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      selectedOption=""
      onChange={() => {}}
    />
  );
  const wrapper = shallow(comp);
  const select = wrapper.find(Select);
  expect(wrapper.find({ children: 'Test' }).length).toBe(1);
  expect(select.prop('id')).toBe('test');
  expect(select.prop('name')).toBe('test-name');
  expect(select.prop('placeholder')).toBe('test placeholder');
  expect(select.prop('className')).toBe('custom-class');
  expect(select.prop('value')).toBe(null);
});

it('should inject default props', () => {
  const spy = jest.fn();
  const wrapper = shallow(
    <NativeSelect
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      selectedOption="Chocolate"
      onChange={spy}
      label="Test"
      name="test-name"
    />
  );
  const select = wrapper.find(Select);
  expect(wrapper.find({ children: 'Test' }).length).toBe(1);
  expect(select.prop('id')).toBe('test-name-input');
  expect(select.prop('name')).toBe('test-name');
  expect(select.prop('placeholder')).toBe('Test');
  expect(select.prop('value')).toBe('Chocolate');
  expect(select.prop('options')).toStrictEqual([
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Strawberry', value: 'strawberry' },
  ]);
  const onChange = select.prop('onChange') as Function;
  onChange();
  expect(spy).toBeCalledTimes(1);
});
