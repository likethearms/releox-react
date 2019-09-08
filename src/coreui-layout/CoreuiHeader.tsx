import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CoreuiHeaderSideBarToggle } from './CoreuiHeaderSideBarToggle';

export interface CoreuiHeaderProps {
  title: string | JSX.Element;
  brandUrl: string;
  headerRightText: string;
}

const CoreuiHeaderComponent = ({ title, headerRightText, brandUrl }: CoreuiHeaderProps) => (
  <div className="app-header navbar" style={{ paddingRight: '20px' }}>
    <CoreuiHeaderSideBarToggle
      buttonClass="navbar-toggler mobile-sidebar-toggler d-md-none mr-auto"
      toggleClass="sidebar-show"
    />
    <Link to={brandUrl} className="navbar-brand">
      {title}
    </Link>
    <ul className="nav navbar-nav ml-auto d-none d-sm-block">
      <li className="nav-item px-3">
        {headerRightText}
      </li>
    </ul>
  </div>
);

CoreuiHeaderComponent.propTypes = {
  title: PropTypes.node.isRequired,
  brandUrl: PropTypes.string,
  headerRightText: PropTypes.node,
};

CoreuiHeaderComponent.defaultProps = {
  brandUrl: '/',
  headerRightText: '',
};

export const CoreuiHeader = CoreuiHeaderComponent;
