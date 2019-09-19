import React from 'react';
import PropTypes from 'prop-types';

export interface CardProps {
  children: JSX.Element[] | string[] | string | JSX.Element;
  header?: JSX.Element | string;
  id?: string;
  className?: string;
  setCardBody?: boolean;
}

const CardComponent = (props: CardProps) => {
  const { children, header, id, className, setCardBody } = props;
  return (
    <div className="card" id={id}>
      {header ? <div className={`card-header ${className}`}>{header}</div> : undefined}
      <div className={setCardBody ? 'card-body' : ''}>{children}</div>
    </div>
  );
};

CardComponent.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  setCardBody: PropTypes.bool,
};

CardComponent.defaultProps = {
  header: undefined,
  id: '',
  className: '',
  setCardBody: true,
};

export const Card = CardComponent;
