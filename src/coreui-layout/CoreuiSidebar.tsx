import React from 'react';
import PropTypes from 'prop-types';
import { CoreuiSidebarDropdown } from './CoreuiSidebarDropdown';
import { CoreuiSidebarItem } from './CoreuiSidebarItem';

interface CoreuiSidebarMenuBase {
  type?: string;
  text: string;
  url: string;
  icon?: string;
  onClick?: () => void;
  exact?: boolean;
}

export interface CoreuiSidebarMenu extends CoreuiSidebarMenuBase {
  children?: CoreuiSidebarMenuBase[];
}

export interface CoreuiSidebarProps {
  menu: CoreuiSidebarMenu[];
}

const getSideBarItem = (context: string = '') => (item: CoreuiSidebarMenuBase) => (
  <CoreuiSidebarItem
    key={`${context}SidebarItem#${item.text}`}
    icon={item.icon}
    exact={item.exact}
    url={item.url}
    onClick={item.onClick}
  >
    {item.text}
  </CoreuiSidebarItem>
);

const getSidebarDropdown = (menu: CoreuiSidebarMenu, clickHandler: (e: any) => void) => {
  const child = menu.children as CoreuiSidebarMenuBase[];
  return (
    <CoreuiSidebarDropdown
      key={`Dropown#${menu.text}`}
      icon={menu.icon}
      text={menu.text}
      clickHandler={clickHandler}
      url={menu.url}
    >
      {child.map(getSideBarItem('Dropdown#'))}
    </CoreuiSidebarDropdown>
  );
};

const getMenuTitle = (m: CoreuiSidebarMenu) => <li key={`title#${m.text}`} className="nav-title">{m.text}</li>;

const generateMenuArray = (m: CoreuiSidebarMenu) => {
  const clickHandler = (e: any) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };
  if (m.type === 'title') return getMenuTitle(m);
  if (m.type === 'dropdown' && m.children) {
    return getSidebarDropdown(m, clickHandler);
  }
  return getSideBarItem()(m);
};

const CoreuiSidebarComponent = ({ menu }: CoreuiSidebarProps) => {
  const menuJsx = menu.map(generateMenuArray);
  return (
    <div className="sidebar pt-2">
      <div className="sidebar-nav">
        <ul className="nav">
          {menuJsx}
        </ul>
      </div>
    </div>
  );
};

CoreuiSidebarComponent.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  })).isRequired,
};

export const CoreuiSidebar = CoreuiSidebarComponent;
