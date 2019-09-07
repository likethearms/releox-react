import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { routeMapper } from './routeMapper';
import { authRoutes } from './auth-routes';

describe('routeMapper', () => {
  it('should render routes correctly', () => {
    const wrapper = shallow(<MemoryRouter>{authRoutes.map(routeMapper)}</MemoryRouter>);
    expect(wrapper.find('Route[path="/login"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/forgot"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/forgot-success"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/reset-password"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/reset-password-success"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/accept-invitation"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/accept-invitation-success"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/auth-error"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/confirm"]')).toHaveLength(1);
    expect(wrapper.find('Route[path="/logout"]')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(10);
  });
});
