import React from 'react';
import { Formik } from 'formik';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { CoreuiCheckBox } from './CoreuiCheckBox';

it('should default props', () => {
  const wrapper = shallow(<CoreuiCheckBox name="bar" label="foo" />);
  expect(wrapper.find('[name="bar"]')).toHaveLength(1);
  expect(wrapper.find('#bar-input')).toHaveLength(1);
});

it('should implement props', () => {
  const wrapper = shallow(<CoreuiCheckBox name="bar" label="foo" id="idFoo" />);
  expect(wrapper.find('[name="bar"]')).toHaveLength(1);
  expect(wrapper.find('#idFoo')).toHaveLength(1);
});

describe('Mounted test', () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <Formik onSubmit={() => {}} initialValues={{ bar: true }}>
        {() => <CoreuiCheckBox name="bar" label="foo" />}
      </Formik>
    );
  });

  it('should inject init values', () => {
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });

  it('should simulate change', () => {
    const checkbox = wrapper.find('#core-checkbox-bar');
    checkbox.simulate('change');
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('should have label', () => {
    const label = wrapper.find('.label');
    expect(label.prop('children')).toBe('foo');
  });
});
