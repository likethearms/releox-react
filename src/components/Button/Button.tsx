import React from 'react';
import PropTypes from 'prop-types';

export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
  LINK = 'link',
}

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

export interface ButtonProps {
  id: string;
  type?: ButtonType;
  className?: string;
  children: string;
  color?: ButtonColor,
}

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
