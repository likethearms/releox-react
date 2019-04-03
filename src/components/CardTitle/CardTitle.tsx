import React from 'react';
import PropTypes from 'prop-types';
import { CardTitleProps } from '../../typings';

const CardTitle = ({ children }: CardTitleProps) => (
  <h5 className="card-title">
      {children}
  </h5>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardTitle;
