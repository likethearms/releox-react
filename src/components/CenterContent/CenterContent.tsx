import React from 'react';
import PropTypes from 'prop-types';

export interface CardProps {
  children: JSX.Element | string;
}

const CenterContent = ({ children }: CardProps) => (
  <div className="flex-row align-items-center CenterContent">
    <div className="container">
      <div className="row justify-content-center CenterContent-row">
        {children}
      </div>
    </div>
  </div>
);

CenterContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterContent;
