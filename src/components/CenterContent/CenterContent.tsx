import React from 'react';
import PropTypes from 'prop-types';
import { CenterContentProps } from '../../typings';

const CenterContent = ({ children }: CenterContentProps) => (
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
