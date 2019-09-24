import React from 'react';
import { shallow } from 'enzyme';
import { CenterContent } from './CenterContent';

it('should render children', () => {
  const wrapper = shallow(<CenterContent>Foo</CenterContent>);
  expect(wrapper.find({ children: 'Foo' })).toHaveLength(1);
});
