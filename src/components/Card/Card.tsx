import React from 'react';
import PropTypes from 'prop-types';

export interface CardProps {
  children: JSX.Element[] | string[] | string | JSX.Element;
}

const CardComponent = ({ children }: CardProps) => (
  <div className="card">
    <div className="card-body">
      {children}
    </div>
  </div>
);

CardComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Card = CardComponent;
