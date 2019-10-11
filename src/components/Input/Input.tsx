import React from 'react';
import { Field, FieldProps } from 'formik';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';

export type InputTypes = 'text' | 'email' | 'password' | 'date' | 'number';

export interface InputProps extends AbstractInputGroupProps {
  type?: InputTypes;
  placeholder?: string;
  className?: string;
}

export class Input extends AbstractFormikInputGroup<InputProps> {
  getElement(name: string, id: string): JSX.Element {
    const { type, placeholder, label, className } = this.props;
    const InputElement = (fieldProps: FieldProps) => {
      return (
        <div>
          <input
            {...fieldProps.field} // eslint-disable-line
            type={type || 'text'}
            id={id || `${name}-input`}
            placeholder={placeholder || label}
            className={className || `form-control ${this.getInvalidClass(fieldProps)}`}
          />
          {this.getErrorMessageField(name)}
        </div>
      );
    };
    return <Field name={name} render={InputElement} />;
  }
}
