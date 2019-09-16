import React from 'react';
import PropTypes from 'prop-types';

export interface CardProps {
  children: JSX.Element[] | string[] | string | JSX.Element;
  header?: boolean;
  headerChildren?: JSX.Element | string;
  color?: string;
  id?: string;
  className?: string;
}

const CardComponent = (props: CardProps) => {
  const {
    children, header, headerChildren, color, id, className,
  } = props;
  return (
    <div className="card">
      {
        header
          ? <div className={`card-header text-white ${className}`} style={{ backgroundColor: `${color}` }} id={id}>{headerChildren}</div>
          : null
      }
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
  headerChildren: PropTypes.node,
  color: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

CardComponent.defaultProps = {
  header: false,
  headerChildren: '',
  color: '',
  id: '',
  className: '',
};

export const Card = CardComponent;
