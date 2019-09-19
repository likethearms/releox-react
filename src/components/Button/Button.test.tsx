import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

it('should show input', () => {
  const wrapper = shallow(<Button id="foo-id">Foo</Button>);
  expect(wrapper.find({ children: 'Foo' }).length).toBe(1);
  expect(wrapper.find('#foo-id').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = shallow(
    <Button id="foo-id" type="submit" className="test-class" color="light">
      Foo
    </Button>
  );
  expect(wrapper.find('button').prop('type')).toBe('submit');
  expect(wrapper.find('button').prop('className')).toContain('test-class');
  expect(wrapper.find('button').prop('className')).toContain('light');
});
