import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { getAuthRoutes } from './auth-routes';
import { routeMapper } from './routeMapper';

describe('routeMapper', () => {
  it('should render routes correctly', () => {
    const wrapper = shallow(<MemoryRouter>{getAuthRoutes().map(routeMapper)}</MemoryRouter>);
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
