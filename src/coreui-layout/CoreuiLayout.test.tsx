import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { CoreuiLayout } from './CoreuiLayout';

let wrapper: ReactWrapper;
const routerWrapper = (c: any) => <MemoryRouter>{c}</MemoryRouter>;

describe('CoreuiLayout', () => {
  describe('CoreuiHeader', () => {
    it('should set logo redirect link to / by default', () => {
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={[]}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('[to="/"]')).toHaveLength(1);
    });

    it('should set logo redirect link to /foo', () => {
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={[]} brandUrl="/foo">
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('[to="/foo"]')).toHaveLength(1);
    });

    it('should show title', () => {
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Baz" sidebarMenu={[]}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('a.navbar-brand').text()).toBe('Foo Baz');
    });

    it('should menu notification', () => {
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Baz" sidebarMenu={[]} headerRightText="Baz">
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('li.nav-item').text()).toBe('Baz');
    });

    it('should sidebar toggle', () => {
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={[]}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('span.navbar-toggler-icon')).toHaveLength(1);
    });

    it('should add class to app class when toggle clicked', () => {
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={[]}>
            MainContent
          </CoreuiLayout>
        )
      );
      const spy = jest.fn();
      document.getElementsByClassName = () => [{ classList: { toggle: spy } }] as any;
      const onClick = wrapper
        .find('.CoreuiHeaderSideBarToggleComponent')
        .prop('onClick') as Function;
      onClick();
      expect(spy).toBeCalledWith('sidebar-show');
    });
  });

  describe('CoreuiSidebar', () => {
    it('should render sidebar items correctly', () => {
      const menu = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('NavLink[to="/foo"]')).toHaveLength(1);
      expect(wrapper.find('NavLink[to="/bar"]')).toHaveLength(1);
      expect(wrapper.find('[children="Foo"]')).toHaveLength(1);
      expect(wrapper.find('[children="Bar"]')).toHaveLength(1);
    });

    it('should show icon', () => {
      const menu = [{ text: 'Foo', url: '/foo', icon: 'foo-icon' }];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('i')).toHaveLength(1);
    });

    it('should show button instead if onclick is set', () => {
      const menu = [{ text: 'Foo', url: '/foo', onClick: () => {} }];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('.sidebar').find('button')).toHaveLength(1);
    });

    it('should show title', () => {
      const menu = [{ text: 'Foo', url: '/foo', type: 'title' }];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('.nav-title')).toHaveLength(1);
    });

    it('should remove class sidebar-show from app class', () => {
      const spy = jest.fn();
      const menu = [{ text: 'Foo', url: '/foo' }];
      document.getElementsByClassName = () => [{ classList: { toggle: spy } }] as any;
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      const onClick = wrapper.find('NavLink[to="/foo"]').prop('onClick') as Function;
      onClick();
      expect(spy).toBeCalledWith('sidebar-show');
    });

    it('should render dropdown items correctly', () => {
      const children = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
      const menu = [
        {
          children,
          type: 'dropdown',
          text: 'Dropdown 1',
          url: '/baz',
        },
      ];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('.nav-dropdown')).toHaveLength(1);
      expect(wrapper.find('NavLink[to="/foo"]')).toHaveLength(1);
      expect(wrapper.find('NavLink[to="/bar"]')).toHaveLength(1);
      expect(wrapper.find('[children="Foo"]')).toHaveLength(1);
      expect(wrapper.find('[children="Bar"]')).toHaveLength(1);
    });

    it('should render dropdown open if url is same than prop url', () => {
      Object.defineProperty(window, 'location', { value: { pathname: '/baz' }, writable: true });
      const children = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
      const menu = [
        {
          children,
          type: 'dropdown',
          text: 'Dropdown 1',
          url: '/baz',
        },
      ];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      expect(wrapper.find('.open')).toHaveLength(1);
    });

    test('onclick add open class to dropdown parent', () => {
      const children = [{ text: 'Foo', url: '/foo' }, { text: 'Bar', url: '/bar' }];
      const menu = [
        {
          children,
          type: 'dropdown',
          text: 'Dropdown 1',
          url: '/baz',
        },
      ];
      wrapper = mount(
        routerWrapper(
          <CoreuiLayout brand="Foo Bar" sidebarMenu={menu}>
            MainContent
          </CoreuiLayout>
        )
      );
      const spy = jest.fn();
      const spy2 = jest.fn();
      const clickHandler = wrapper
        .find('CoreuiSidebarDropdownComponent')
        .prop('clickHandler') as Function;
      clickHandler({
        preventDefault: spy,
        target: { parentElement: { classList: { toggle: spy2 } } },
      });
      expect(spy).toBeCalledTimes(1);
      expect(spy2).toBeCalledWith('open');
    });
  });
});

describe('CoreuiMain', () => {
  it('should have app class', () => {
    wrapper = mount(
      routerWrapper(
        <CoreuiLayout brand="Foo Bar" sidebarMenu={[]}>
          MainContent
        </CoreuiLayout>
      )
    );
    expect(wrapper.find('.app')).toHaveLength(1);
  });

  it('should render children', () => {
    wrapper = mount(
      routerWrapper(
        <CoreuiLayout brand="Foo Bar" sidebarMenu={[]}>
          MainContent
        </CoreuiLayout>
      )
    );
    expect(wrapper.find('.container-fluid[children="MainContent"]')).toHaveLength(1);
  });
});
