import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
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

describe('Mounted test', () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(
      <FormikFormWrapper
        onSubmit={() => { }}
        initialValues={{ bar: true }}
      >
        <CheckBox
          name="bar"
        />
      </FormikFormWrapper>,
    );
  });

  it('should inject init values', () => {
    expect(wrapper.find('FormikFormWrapperComponent').prop('initialValues')).toStrictEqual({ bar: true });
  });

  it('should render', () => {
    expect(wrapper.find('input').prop('type')).toBe('checkbox');
  });
});
