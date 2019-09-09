import React from 'react';
import { shallow, mount } from 'enzyme';
import { CoreuiCheckBox } from './CoreuiCheckBox';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

it('should default props', () => {
  const wrapper = shallow(
    <CoreuiCheckBox
      name="bar"
      label="foo"
    />,
  );
  expect(wrapper.find('[name="bar"]').length).toBe(1);
  expect(wrapper.find('#bar-input').length).toBe(1);
  expect(wrapper.find('.form-control').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <CoreuiCheckBox
      name="bar"
      label="foo"
      id="idFoo"
      className="classname-bar"
    />,
  );
  expect(wrapper.find('[name="bar"]').length).toBe(1);
  expect(wrapper.find('#idFoo').length).toBe(1);
  expect(wrapper.find('.classname-bar').length).toBe(1);
});

it('should simulate change to checked', () => {
  const wrapper = mount(
    <FormikFormWrapper
      onSubmit={() => { }}
      initialValues={{ field: { value: false } }}
    >
      <CoreuiCheckBox
        name="bar"
        label="foo"
      />
    </FormikFormWrapper>,
  );

  const checkbox = wrapper.find('#core-checkbox');
  checkbox.simulate('change');
  expect(wrapper.find('input').prop('checked')).toBe(true);
  const label = wrapper.find('.label');
  expect(label.prop('children')).toBe('foo');
});
