import React from 'react';
import { Field, FieldProps } from 'formik';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';

export interface InputProps extends AbstractInputGroupProps {
  placeholder?: string;
  className?: string;
}

export class FileInput extends AbstractFormikInputGroup<InputProps> {
  getElement(name: string, id: string): JSX.Element {
    const { placeholder, label, className } = this.props;
    const InputElement = (fieldProps: FieldProps) => {
      return (
        <div>
          <input
            {...fieldProps.field} // eslint-disable-line
            type="file"
            id={id || `${name}-input`}
            placeholder={placeholder || label}
            className={className || `inputfile ${this.getInvalidClass(fieldProps)}`}
            value={fieldProps.field.value}
            onChange={(event: any) => {
              fieldProps.form.setFieldValue('file', event.currentTarget.files[0]);
            }}
          />
          <label htmlFor={id || `${name}-input`}>Valitse tiedosto</label>
          {this.getErrorMessageField()}
        </div>
      );
    };
    return <Field name={name} render={InputElement} />;
  }
}
