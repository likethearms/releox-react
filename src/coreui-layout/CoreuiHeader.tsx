import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CoreuiHeaderSideBarToggle from './CoreuiHeaderSideBarToggle';

export interface CoreuiHeaderProps {
  title: string | JSX.Element;
  brandUrl?: string;
  menuTitle: string;
}

const CoreuiHeader = ({ title, menuTitle, brandUrl }: CoreuiHeaderProps) => (
  <div className="app-header navbar" style={{ paddingRight: '20px' }}>
    <CoreuiHeaderSideBarToggle
      buttonClass="navbar-toggler mobile-sidebar-toggler d-md-none mr-auto"
      toggleClass="sidebar-show"
    />
    <Link to={brandUrl || '/'} className="navbar-brand">
      {title}
    </Link>
    <ul className="nav navbar-nav ml-auto d-none d-sm-block">
      <li className="nav-item px-3">
        {menuTitle}
      </li>
    </ul>
  </div>
);

CoreuiHeader.propTypes = {
  title: PropTypes.node.isRequired,
  menuTitle: PropTypes.node,
};

CoreuiHeader.defaultProps = {
  menuTitle: '',
};

export default CoreuiHeader;
