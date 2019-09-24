import React from 'react';
import Select from 'react-select';
import { FieldProps, Field } from 'formik';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';

interface SelectProps extends AbstractInputGroupProps {
  options: any[];
  onChange(value: any): void;
  className?: string;
  placeholder?: string;
  selectedOption?: any;
}

export class ReactSelect extends AbstractFormikInputGroup<SelectProps> {
  getElement(name: string, id: string): JSX.Element {
    const { placeholder, label, options, selectedOption, onChange } = this.props;
    const Element = (fieldProps: FieldProps) => (
      <div>
        <Select
          id={id || `${name}-input`}
          onChange={onChange}
          options={options}
          placeholder={placeholder || label}
          value={selectedOption || null}
          className={`form-control ${this.getInvalidClass(fieldProps)}`}
        />
        {this.getErrorMessageField()}
      </div>
    );
    return <Field name={name} render={Element} />;
  }
}
