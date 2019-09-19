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

const CoreuiSidebarItemComponent = (props: SidebarItemProps) => {
  const { icon, children, url, onClick, exact } = props;
  return (
    <li className="nav-item">
      {onClick ? (
        <button type="button" onClick={onClick} className="btn btn-link nav-link">
          {children}
        </button>
      ) : (
        <NavLink
          exact={exact}
          to={url as string}
          className="nav-link"
          // onClick is required to close sidebar on mobile when link is clicked
          onClick={() => document.getElementsByClassName('app')[0].classList.toggle('sidebar-show')}
        >
          {icon ? <i className={icon} /> : ''}
          {` ${children}`}
        </NavLink>
      )}
    </li>
  );
};

CoreuiSidebarItemComponent.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  exact: PropTypes.bool,
};

CoreuiSidebarItemComponent.defaultProps = {
  exact: false,
  url: undefined,
  onClick: undefined,
  icon: '',
};

export const CoreuiSidebarItem = CoreuiSidebarItemComponent;
