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

const CoreuiSidebarComponent = ({ menu }: CoreuiSidebarProps) => {
  const clickHandler = (e: any) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };

  const menuJsx = menu.map((m) => {
    if (m.type === 'dropdown' && m.children) {
      return (
        <CoreuiSidebarDropdown
          key={`Dropown#${m.text}`}
          icon={m.icon}
          text={m.text}
          clickHandler={clickHandler}
          url={m.url}
        >
          {m.children.map((c) => (
            <CoreuiSidebarItem
              key={`Dropown#SidebarItem#${c.text}`}
              icon={c.icon}
              exact={c.exact}
              url={c.url}
            >
              {c.text}
            </CoreuiSidebarItem>
          ))}
        </CoreuiSidebarDropdown>
      );
    }
    if (m.type === 'title') {
      return <li key={`title#${m.text}`} className="nav-title">{m.text}</li>;
    }
    return (
      <CoreuiSidebarItem
        key={`SidebarItem#${m.text}`}
        icon={m.icon}
        exact={m.exact}
        url={m.url}
        onClick={m.onClick}
      >
        {m.text}
      </CoreuiSidebarItem>
    );
  });

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
