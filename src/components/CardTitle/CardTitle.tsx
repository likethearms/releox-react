import React from 'react';
import PropTypes from 'prop-types';

export interface CardTitleProps {
  children: string | JSX.Element;
}

const CardTitle = ({ children }: CardTitleProps) => (
  <h5 className="card-title">
      {children}
  </h5>
);

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardTitle;
