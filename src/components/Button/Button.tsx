import PropTypes from 'prop-types';
import React from 'react';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link';
export type ButtonType = 'submit' | 'button';

export interface ButtonProps {
  id: string;
  type?: ButtonType;
  onClick?: () => any;
  className?: string;
  children: string | JSX.Element;
  color?: ButtonColor;
  disabled?: boolean;
  disabledText?: string;
}

/* eslint-disable react/button-has-type */
const ButtonComponent = (props: ButtonProps) => {
  const { id, children, color, className, onClick, type, disabled, disabledText } = props;
  let text = children;
  if (disabled && disabledText) text = disabledText;
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`btn btn-${color} ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
};

ButtonComponent.defaultProps = {
  type: 'button',
  color: 'primary',
  className: '',
};

export const Button = ButtonComponent;
