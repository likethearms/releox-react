import React from 'react';
import { shallow } from 'enzyme';
import { CardTitle } from './CardTitle';

it('should show h5', () => {
  const wrapper = shallow(<CardTitle>Foo</CardTitle>);
  expect(wrapper.find('h5[children="Foo"]')).toHaveLength(1);
});

it('should show h1', () => {
  const wrapper = shallow(<CardTitle xl>Foo</CardTitle>);
  expect(wrapper.find('h1[children="Foo"]')).toHaveLength(1);
});

it('should show h3', () => {
  const wrapper = shallow(<CardTitle lg>Foo</CardTitle>);
  expect(wrapper.find('h3[children="Foo"]')).toHaveLength(1);
});
