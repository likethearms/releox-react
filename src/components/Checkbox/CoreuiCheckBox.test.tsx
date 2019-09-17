import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
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
});

it('should implement props', () => {
  const wrapper = shallow(
    <CoreuiCheckBox
      name="bar"
      label="foo"
      id="idFoo"
    />,
  );
  expect(wrapper.find('[name="bar"]').length).toBe(1);
  expect(wrapper.find('#idFoo').length).toBe(1);
});

describe('Mounted test', () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <FormikFormWrapper
        onSubmit={() => { }}
        initialValues={{ bar: true }}
      >
        <CoreuiCheckBox
          name="bar"
          label="foo"
        />
      </FormikFormWrapper>,
    );
  });

  it('should inject init values', () => {
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });

  it('should simulate change', () => {
    const checkbox = wrapper.find('#core-checkbox');
    checkbox.simulate('change');
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('should have label', () => {
    const label = wrapper.find('.label');
    expect(label.prop('children')).toBe('foo');
  });
});
