import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { routeMapper } from './routeMapper';

describe('routeMapper', () => {
  it('should render routes correctly', () => {
    const wrapper = shallow(
      <MemoryRouter>{routeMapper({ component: () => <span>Foo</span>, url: '/foo' })}</MemoryRouter>
    );
    expect(wrapper.find('Route[path="/foo"]')).toHaveLength(1);
  });
});
