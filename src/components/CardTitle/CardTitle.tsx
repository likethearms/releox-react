import React from 'react';
import PropTypes from 'prop-types';

export interface CardTitleProps {
  children: string | JSX.Element;
  lg?: boolean;
  xl?: boolean;
}

const CardTitleComponent = ({ children, lg, xl }: CardTitleProps) => {
  if (xl) {
    return <h1 className="card-title">{children}</h1>;
  }
  if (lg) {
    return <h3 className="card-title">{children}</h3>;
  }
  return <h5 className="card-title">{children}</h5>;
};

CardTitleComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CardTitle = CardTitleComponent;
