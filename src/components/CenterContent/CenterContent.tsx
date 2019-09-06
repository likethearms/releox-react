import React from 'react';
import PropTypes from 'prop-types';

export interface CenterContentProps {
  children: JSX.Element | string;
}

const CenterContentComponent = ({ children }: CenterContentProps) => (
  <div className="flex-row align-items-center CenterContent">
    <div className="container">
      <div className="row justify-content-center CenterContent-row">
        {children}
      </div>
    </div>
  </div>
);

CenterContentComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CenterContent = CenterContentComponent;
