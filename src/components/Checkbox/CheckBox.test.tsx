import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckBox } from './CheckBox';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

it('should show CheckBox', () => {
  const wrapper = shallow(<CheckBox name="bar" id="id-foo" />);
  expect(wrapper.find('#id-foo').length).toBe(1);
  expect(wrapper.find('.form-control').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <CheckBox
      name="bar"
      className="classname-foo"
    />,
  );
  expect(wrapper.find('#bar-input').length).toBe(1);
  expect(wrapper.find('.classname-foo').length).toBe(1);
  expect(wrapper.find('[name="bar"]').length).toBe(1);
});

it('should call render', () => {
  const onSubmit = jest.fn();
  const wrapper = mount(
    <FormikFormWrapper
    onSubmit={onSubmit}
    initialValues={{ field: {
      checked: true,
      value: true,
    }}}
    >
      <CheckBox
        name="bar"
        id="id-foo"
        className="classname-foo"
      />
    </FormikFormWrapper>,
  );

  console.log(wrapper.find('input').props());
  // const onC = wrapper.find('input').prop('onChange') as Function;
  // onC();
  // expect(onC).toBeCalledTimes(1);
});
