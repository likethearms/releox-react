import React from 'react';
import { Field, FieldProps } from 'formik';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';

export interface TextAreaProps extends AbstractInputGroupProps {
  rows?: number;
  placeholder?: string;
  className?: string;
}

export class TextArea extends AbstractFormikInputGroup<TextAreaProps> {
  getInputElement = (fieldProps: FieldProps) => {
    const { rows, placeholder, label, className, name, id } = this.props;
    return (
      <div>
        <textarea
          rows={rows || 6}
          defaultValue={fieldProps.field.value}
          onBlur={(e) => fieldProps.form.setFieldValue(fieldProps.field.name, e.target.value)}
          id={id || `${name}-input`}
          placeholder={placeholder || label}
          className={className || `form-control ${this.getInvalidClass(fieldProps)}`}
        />
        {this.getErrorMessageField(name)}
      </div>
    );
  };

  getElement(name: string): JSX.Element {
    this.getInputElement = this.getInputElement.bind(this);
    return <Field name={name} component={this.getInputElement} />;
  }
}
