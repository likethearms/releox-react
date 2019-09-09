import React from 'react';
import { shallow, mount } from 'enzyme';
import { CoreuiCheckBox } from './CoreuiCheckBox';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

it('should show CoreuiCheckBox', () => {
  const wrapper = shallow(<CoreuiCheckBox name="bar" id="id-foo" label="foo" />);
  expect(wrapper.find('#id-foo').length).toBe(1);
  expect(wrapper.find('.form-control').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <CoreuiCheckBox
      name="bar"
      className="classname-foo"
      label="foo"
    />,
  );
  expect(wrapper.find('#bar-input').length).toBe(1);
  expect(wrapper.find('.classname-foo').length).toBe(1);
  expect(wrapper.find('[name="bar"]').length).toBe(1);
});

it('should change initial prop', () => {
  const wrapper = mount(
    <FormikFormWrapper
      onSubmit={() => { }}
      initialValues={{ field: { value: false } }}
    >
      <CoreuiCheckBox
        name="bar"
        id="id-foo"
        label="foo"
        className="classname-foo"
      />
    </FormikFormWrapper>,
  );

  const checkbox = wrapper.find('#core-checkbox');
  checkbox.simulate('change');
  expect(wrapper.find('input').prop('checked')).toBe(true);
});
