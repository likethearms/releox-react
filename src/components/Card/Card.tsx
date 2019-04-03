import React from 'react';
import PropTypes from 'prop-types';
import { CardProps } from '../../typings';

const Card = ({ children }: CardProps) => (
  <div className="card">
    <div className="card-body">
      {children}
    </div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
