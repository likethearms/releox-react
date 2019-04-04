import React from 'react';
import PropTypes from 'prop-types';
import { ButtonProps } from '../../typings';

const Button = ({ type, id, children, color, className, onClick }: ButtonProps) => (
  <button
    type={type || 'button'}
    id={id}
    onClick={onClick}
    className={`btn btn-${color || 'primary'} ${className}`}>
    {children}
  </button>
);

Button.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
