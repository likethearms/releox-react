import React from 'react';
import { shallow } from 'enzyme';
import { Card } from './Card';

it('should show card', () => {
  const wrapper = shallow(<Card>Foo</Card>);
  expect(wrapper.find({ children: 'Foo' }).length).toBe(1);
});

it('should show card with header', () => {
  const wrapper = shallow(
    <Card header={<span>Foo</span>} className="bg-primary">
      Bar
    </Card>
  );
  expect(wrapper.find({ children: 'Bar' }).length).toBe(1);
  expect(wrapper.find({ children: 'Foo' }).length).toBe(1);
  expect(wrapper.find('.bg-primary').length).toBe(1);
  expect(wrapper.find('.card-body').length).toBe(1);
});

it('should show card without card-body class', () => {
  const wrapper = shallow(
    <Card setCardBody={false} className="bg-primary">
      Bar
    </Card>
  );
  expect(wrapper.find('.card-body').length).toBe(0);
});
