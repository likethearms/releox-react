import React from 'react';
import { shallow } from 'enzyme';
import { TextArea } from './TextArea';

it('should show textArea', () => {
  const wrapper = shallow(<TextArea name="bar" label="FOO BAR" />);
  expect(wrapper.find('#bar-input').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <TextArea rows={10} name="bar" id="id-foo" label="foo bar" className="classname-foo" />
  );

  expect(wrapper.find('#id-foo').length).toBe(1);
  expect(wrapper.find('.classname-foo').length).toBe(1);
  expect(wrapper.find('[name="bar"]').length).toBe(1);
  expect(wrapper.find('[placeholder="foo bar"]').length).toBe(1);
});
