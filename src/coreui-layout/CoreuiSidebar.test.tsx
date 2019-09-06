import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { CoreuiSidebar } from './CoreuiSidebar';

let wrapper: ReactWrapper;
const routerWrapper = (c: any) => (<MemoryRouter>{c}</MemoryRouter>);

window = Object.create(window); // eslint-disable-line
Object.defineProperty(window, 'location', { value: { pathname: '' }, writable: true });

describe('CoreuiSidebar', () => {
  it('should render sidebar items correctly', () => {
    const menu = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    expect(wrapper.find('NavLink[to="/foo"]').length).toBe(1);
    expect(wrapper.find('NavLink[to="/bar"]').length).toBe(1);
    expect(wrapper.find('[children="Foo"]').length).toBe(1);
    expect(wrapper.find('[children="Bar"]').length).toBe(1);
  });

  it('should show icon', () => {
    const menu = [{ text: 'Foo', url: '/foo', icon: 'foo-icon' }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    expect(wrapper.find('i').length).toBe(1);
  });

  it('should show button instead if onclick is set', () => {
    const menu = [{ text: 'Foo', url: '/foo', onClick: () => { } }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should show title', () => {
    const menu = [{ text: 'Foo', url: '/foo', type: 'title' }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    expect(wrapper.find('.nav-title').length).toBe(1);
  });

  it('should render dropdown items correctly', () => {
    const children = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
    const menu = [{
      children,
      type: 'dropdown',
      text: 'Dropdown 1',
      url: '/baz',
    }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    expect(wrapper.find('.nav-dropdown').length).toBe(1);
    expect(wrapper.find('NavLink[to="/foo"]').length).toBe(1);
    expect(wrapper.find('NavLink[to="/bar"]').length).toBe(1);
    expect(wrapper.find('[children="Foo"]').length).toBe(1);
    expect(wrapper.find('[children="Bar"]').length).toBe(1);
  });

  it('should render dropdown open if url is same than prop url', () => {
    Object.defineProperty(window, 'location', { value: { pathname: '/baz' }, writable: true });
    const children = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
    const menu = [{
      children,
      type: 'dropdown',
      text: 'Dropdown 1',
      url: '/baz',
    }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    expect(wrapper.find('.open').length).toBe(1);
  });

  test('onclick add open class to dropdown parent', () => {
    const children = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
    const menu = [{
      children,
      type: 'dropdown',
      text: 'Dropdown 1',
      url: '/baz',
    }];
    wrapper = mount(routerWrapper(<CoreuiSidebar menu={menu} />));
    const spy = jest.fn();
    const spy2 = jest.fn();
    const clickHandler = wrapper.find('CoreuiSidebarDropdownComponent').prop('clickHandler') as Function;
    clickHandler({
      preventDefault: spy,
      target: { parentElement: { classList: { toggle: spy2 } } },
    });
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledWith('open');
  });
});
