import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export interface SidebarItemProps {
  icon?: string;
  children: string;
  url?: string;
  onClick(): void;
  exact?: boolean;
}

const SidebarItem = (props: SidebarItemProps) => {
  const {
    icon, children, url, onClick, exact,
  } = props;
  return (
    <li className="nav-item">
      {onClick ? (
        <button type="button" onClick={onClick} className="btn btn-link nav-link">
          {children}
        </button>
      ) : (
          <NavLink exact={exact} to={url || ''} className="nav-link">
            {icon ? <i className={icon} /> : ''}
            {` ${children}`}
          </NavLink>
        )}
    </li>
  );
};

SidebarItem.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  exact: PropTypes.bool,
};

SidebarItem.defaultProps = {
  exact: false,
  url: undefined,
  onClick: undefined,
  icon: '',
};

export default SidebarItem;
