import React from 'react';
import PropTypes from 'prop-types';
import { CardTitleProps } from '../../typings';

const CardTitle = ({ children, lg, xl }: CardTitleProps) => {
  if (xl) {
    return (
      <h1 className="card-title">
        {children}
      </h1>
    );
  }
  if (lg) {
    return (
      <h3 className="card-title">
        {children}
      </h3>
    );
  }
  return (
    <h5 className="card-title">
      {children}
    </h5>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardTitle;
