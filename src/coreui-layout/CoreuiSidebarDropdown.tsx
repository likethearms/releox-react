import React from 'react';
import PropTypes from 'prop-types';

export interface SidebarDropdownProps {
  icon?: string;
  text: string;
  clickHandler(e: any): void;
  children: JSX.Element | JSX.Element[];
  url: string;
}

const SidebarDropdown = (props: SidebarDropdownProps) => {
  const {
    icon, text, clickHandler, children, url,
  } = props;
  const isActive = window.location.pathname.split('/')[1] === url;
  return (
    <li className={`nav-item nav-dropdown ${isActive ? 'open' : ''}`}>
      <a className="nav-link nav-dropdown-toggle" href="#" onClick={clickHandler}>
        <i className={icon} />
        {` ${text}`}
      </a>
      <ul className="nav-dropdown-items">
        {children}
      </ul>
    </li>
  );
};

SidebarDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.string,
};

SidebarDropdown.defaultProps = {
  icon: '',
};

export default SidebarDropdown;