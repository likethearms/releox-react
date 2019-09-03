import React from 'react';
import { Field } from 'formik';
import AbstractInputGroup from '../AbstractInputGroup/AbstractInputGroup';
import { InputProps } from '../../typings';

class Input extends AbstractInputGroup<InputProps> {
  getElement(name: string, id: string): JSX.Element {
    const {
      type, placeholder, label, className,
    } = this.props;
    return (
      <Field
        name={name}
        component="input"
        id={id || `${name}-input`}
        type={type || 'text'}
        placeholder={placeholder || label}
        className={className || 'form-control'}
      />
    );
  }
}

export default Input;
