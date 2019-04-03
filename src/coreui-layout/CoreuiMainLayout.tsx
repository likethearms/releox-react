import React from 'react';
import PropTypes from 'prop-types';

export interface CoreuiMainLayoutProps {
  children: JSX.Element | string;
  header: JSX.Element | string;
  sidebar: JSX.Element | string;
}

const CoreuiMainLayout = ({ children, header, sidebar }: CoreuiMainLayoutProps) => (
  <div className="app sidebar-md-show sidebar-fixed header-fixed">
    {header}
    <div className="app-body">
      {sidebar}
      <div className="main">
        <div className="animated fadeIn container-fluid" style={{ paddingTop: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

CoreuiMainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
};

export default CoreuiMainLayout;
