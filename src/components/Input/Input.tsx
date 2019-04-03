import React from 'react';
import { Field } from 'formik';
import AbstractInputGroup from '../AbstractInputGroup/AbstractInputGroup';
import { InputProps, InputTypes } from '../../typings';

class Input extends AbstractInputGroup<InputProps> {
  getElement(name: string, id: string): JSX.Element {
    const { type, placeholder, label, className } = this.props;
    return (
      <Field
        name={name}
        component="input"
        id={id}
        type={type || InputTypes.TEXT}
        placeholder={placeholder || label}
        className={className || 'form-control'}
      />
    );
  }
}

export default Input;
