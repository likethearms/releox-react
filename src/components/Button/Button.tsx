import React from 'react';
import PropTypes from 'prop-types';
import { ButtonProps, ButtonColor } from '../../typings';

const Button = ({ type, id, children, color, className }: ButtonProps) => (
  <button
    type={type || 'button'}
    id={id}
    className={`btn btn-${color || ButtonColor.PRIMARY} ${className}`}>
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
