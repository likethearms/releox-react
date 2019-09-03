import React from 'react';
import { Field } from 'formik';
import AbstractInputGroup from '../AbstractInputGroup/AbstractInputGroup';
import { TextAreaProps } from '../../typings';

class TextArea extends AbstractInputGroup<TextAreaProps> {
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

export default TextArea;
