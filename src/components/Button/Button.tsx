import React from 'react';
import PropTypes from 'prop-types';
import { ButtonProps } from '../../typings';

/* eslint-disable react/button-has-type */
const Button = (props: ButtonProps) => {
  const {
    id, children, color, className, onClick, type,
  } = props;
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`btn btn-${color} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  color: 'primary',
  className: '',
};

export default Button;
