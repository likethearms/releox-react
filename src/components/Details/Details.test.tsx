import React from 'react';
import { mount } from 'enzyme';
import { Details } from './Details';

const object = {
  name: 'Test Name',
  id: 1,
};

const props = [{ label: 'Name', key: 'name' }, { label: '#', key: 'id' }];

describe('Details', () => {
  it('should list all given fields', () => {
    const wrapper = mount(<Details object={object} properties={props} />);
    expect(wrapper.find('[children="Name"]')).toHaveLength(1);
    expect(wrapper.find('[children="#"]')).toHaveLength(1);
    expect(wrapper.find('td[children="Test Name"]')).toHaveLength(1);
    expect(wrapper.find('td[children=1]')).toHaveLength(1);
  });
});
