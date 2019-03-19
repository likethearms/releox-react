import React from 'react';
import { shallow } from 'enzyme';
import CardTitle from './CardTitle';

it('should show input', () => {
  const wrapper = shallow(<CardTitle>Foo</CardTitle>);
  expect(wrapper.find({ children: 'Foo' }).length).toBe(1);
});
