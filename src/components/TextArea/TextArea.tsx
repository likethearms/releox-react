import React from 'react';
import { Field } from 'formik';
import { AbstractInputGroupProps, AbstractInputGroup } from '../AbstractInputGroup/AbstractInputGroup';


export interface TextAreaProps extends AbstractInputGroupProps {
  rows?: number;
  placeholder?: string;
  className?: string;
}

export class TextArea extends AbstractInputGroup<TextAreaProps> {
  getElement(name: string, id: string): JSX.Element {
    const {
      rows, placeholder, label, className,
    } = this.props;
    return (
      <Field
        name={name}
        component="textarea"
        rows={rows || 6}
        id={id || `${name}-input`}
        placeholder={placeholder || label}
        className={className || 'form-control'}
      />
    );
  }
}
