import React from 'react';
import PropTypes from 'prop-types';

const CardTitle = ({ children }) => (
  <h3 className="mb-4">{children}</h3>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardTitle;
