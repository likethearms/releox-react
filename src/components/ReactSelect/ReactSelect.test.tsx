import React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import Select from 'react-select';
import { Formik } from 'formik';
import { ReactSelect } from './ReactSelect';

it('should show default inline ReactSelect', () => {
  const wrapper = shallow(
    <ReactSelect
      inline
      name="foo"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      label="Foo"
    />
  );
  expect(wrapper.find('.row')).toHaveLength(1);
  expect(wrapper.find('label.col-md-4')).toHaveLength(1);
  expect(wrapper.find('.col-md-8')).toHaveLength(1);
});

it('should show default inline ReactSelect with custom width and label on right', () => {
  const comp = (
    <ReactSelect
      inline
      name="foo"
      label="Foo"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
      inlineLabelWidth={8}
      labelClass="text-right"
    />
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
        <ReactSelect
          label="Test"
          id="test"
          name="test-name"
          placeholder="test placeholder"
          className="custom-class"
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
          ]}
        />
      )}
    </Formik>
  );
  const wrapper = mount(comp);
  const select = wrapper.find(ReactSelect);
  expect(wrapper.find({ children: 'Test' })).toHaveLength(1);
  expect(select.prop('id')).toBe('test');
  expect(select.prop('name')).toBe('test-name');
  expect(select.prop('placeholder')).toBe('test placeholder');
  expect(select.prop('className')).toBe('custom-class');
});

it('should inject default props', () => {
  const comp = (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <ReactSelect
          label="Test"
          name="test-name"
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
          ]}
        />
      )}
    </Formik>
  );
  const wrapper = mount(comp);
  const reactSelect = wrapper.find(ReactSelect);
  expect(reactSelect.find(Select)).toHaveLength(1);
  expect(reactSelect.prop('name')).toBe('test-name');
  expect(reactSelect.prop('options')).toStrictEqual([
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Strawberry', value: 'strawberry' },
  ]);
  expect(wrapper.find(Select).prop('placeholder')).toBe('Test');
  expect(wrapper.find(Select).prop('id')).toBe('test-name-input');
});

it('should switch value', () => {
  const spy = jest.fn();
  const wrapper: ShallowWrapper<any, any, ReactSelect> = shallow(
    <ReactSelect
      label="Test"
      name="bar"
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
      ]}
    />
  );
  const formProps = {
    field: { name: 'bar' },
    form: { setFieldValue: spy },
    errors: {},
  } as any;
  const w = shallow(wrapper.instance().getInputElement(formProps));
  const select: ShallowWrapper = w.find(Select);
  const onC = select.prop('onChange') as Function;
  onC({ value: 'changedValue' });
  expect(spy).toBeCalledWith('bar', 'changedValue');
});
