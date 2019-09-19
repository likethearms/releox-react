import React from 'react';
import PropTypes from 'prop-types';

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
}

/* eslint-disable react/button-has-type */
const ButtonComponent = (props: ButtonProps) => {
  const { id, children, color, className, onClick, type } = props;
  return (
    <button type={type} id={id} onClick={onClick} className={`btn btn-${color} ${className}`}>
      {children}
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
