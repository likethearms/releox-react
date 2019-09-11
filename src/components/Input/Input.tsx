import React from 'react';
import { Field } from 'formik';
import { AbstractInputGroupProps, AbstractInputGroup } from '../AbstractInputGroup/AbstractInputGroup';

export type InputTypes = 'text' | 'email' | 'password' | 'date' | 'number';

export interface InputProps extends AbstractInputGroupProps {
  type?: InputTypes;
  placeholder?: string;
  className?: string;
}

export class Input extends AbstractInputGroup<InputProps> {
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
