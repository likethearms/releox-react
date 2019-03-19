import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

it('should show input', () => {
  const wrapper = shallow(<Card>Foo</Card>);
  expect(wrapper.find({ children: 'Foo' }).length).toBe(1);
});
