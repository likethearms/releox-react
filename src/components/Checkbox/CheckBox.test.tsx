import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckBox } from './CheckBox';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

it('should implement default props', () => {
  const wrapper = shallow(
    <CheckBox
      name="bar"
    />,
  );
  expect(wrapper.find('[name="bar"]').length).toBe(1);
  expect(wrapper.find('#bar-input').length).toBe(1);
  expect(wrapper.find('.form-control').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <CheckBox
      name="bar"
      id="id-foo"
      className="classname-foo"
    />,
  );
  expect(wrapper.find('#id-foo').length).toBe(1);
  expect(wrapper.find('.classname-foo').length).toBe(1);
});

it('should call render', () => {
  const wrapper = mount(
    <FormikFormWrapper
      onSubmit={() => { }}
      initialValues={{}}
    >
      <CheckBox
        name="bar"
      />
    </FormikFormWrapper>,
  );
  expect(wrapper.find('input').prop('type')).toBe('checkbox');
});
