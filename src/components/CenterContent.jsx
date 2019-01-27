import React from 'react';
import PropTypes from 'prop-types';

const CenterContent = ({ children }) => (
  <div className="app flex-row align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        {children}
      </div>
    </div>
  </div>
);

CenterContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterContent;
