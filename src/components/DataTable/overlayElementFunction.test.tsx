import React from 'react';
import { shallow, mount } from 'enzyme';
import overlayElementFunction from './overlayElementFunction';

describe('overlayElementFunction', () => {
  it('should show children by default', () => {
    const El = overlayElementFunction()(false);
    const wrapper = shallow(
      <El>
        <p>Foo</p>
      </El>
    );
    expect(wrapper.find('p').text()).toBe('Foo');
  });

  it('should show default loading indicator', () => {
    const El = overlayElementFunction()(true);
    const wrapper = shallow(
      <El>
        <p>Foo</p>
      </El>
    );
    expect(wrapper.find('p').text()).toBe('Loading...');
  });

  it('should show custom loading indicator', () => {
    const El = overlayElementFunction({ overlayElement: () => <p>Bar...</p> })(true);
    const wrapper = mount(
      <El>
        <p>Foo</p>
      </El>
    );
    expect(wrapper.find('p').text()).toBe('Bar...');
  });
});
