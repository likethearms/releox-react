import React from 'react';
import { shallow, mount } from 'enzyme';
import { Formik } from 'formik';
import { FileInput } from './FileInput';

it('should show default inline FileInput', () => {
  const wrapper = shallow(<FileInput inline name="foo" label="Foo" />);
  expect(wrapper.find('.row')).toHaveLength(1);
  expect(wrapper.find('label.col-md-4')).toHaveLength(1);
  expect(wrapper.find('.col-md-8')).toHaveLength(1);
});

it('should show default inline FileInput with custom width and label on right', () => {
  const comp = (
    <FileInput inline name="foo" label="Foo" inlineLabelWidth={8} labelClass="text-right" />
  );
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
        <FileInput
          label="Test"
          id="test"
          name="test-name"
          placeholder="test placeholder"
          className="custom-class"
        />
      )}
    </Formik>
  );
  const wrapper = mount(comp);
  const input = wrapper.find(FileInput);
  expect(wrapper.find({ children: 'Test' })).toHaveLength(1);
  expect(input.prop('id')).toBe('test');
  expect(input.prop('name')).toBe('test-name');
  expect(input.prop('placeholder')).toBe('test placeholder');
  expect(input.prop('className')).toBe('custom-class');
});

it('should inject default props', () => {
  const comp = (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => <FileInput label="Test" name="test-name" />}
    </Formik>
  );
  const wrapper = mount(comp);
  const input = wrapper.find(FileInput);
  expect(input.find('input')).toHaveLength(1);
  expect(input.prop('name')).toBe('test-name');
  expect(wrapper.find('input').prop('placeholder')).toBe('Test');
  expect(wrapper.find('input').prop('id')).toBe('test-name-input');
});
