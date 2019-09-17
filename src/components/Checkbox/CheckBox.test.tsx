import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { CheckBox } from './CheckBox';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

it('should implement default props', () => {
  const wrapper = shallow(
    <CheckBox
      name="bar"
      label="Foo"
    />,
  );
  expect(wrapper.find('[name="bar"]').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <CheckBox
      name="bar"
      id="id-foo"
      label="Foo"
    />,
  );
  expect(wrapper.find('#id-foo').length).toBe(1);
});

it('should show label', () => {
  const wrapper = shallow(
    <CheckBox
      name="bar"
      id="id-foo"
      label="Foo"
    />,
  );
  expect(wrapper.find('label[children="Foo"]')).toHaveLength(1);
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
          label="Foo"
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
