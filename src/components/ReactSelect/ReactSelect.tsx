import React from 'react';
import Select from 'react-select';
import { FieldProps, Field } from 'formik';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends AbstractInputGroupProps {
  options: Option[];
  className?: string;
  placeholder?: string;
}

export class ReactSelect extends AbstractFormikInputGroup<SelectProps> {
  getInputElement = (fieldProps: FieldProps) => {
    const { placeholder, label, name, id, options } = this.props;
    return (
      <div>
        <Select
          {...fieldProps.field} // eslint-disable-line
          id={id || `${name}-input`}
          options={options}
          placeholder={placeholder || label}
          className={`${this.getInvalidClass(fieldProps)}`}
          value={options.find((option: Option) => option.value === fieldProps.field.value)}
          onChange={(option: any) =>
            fieldProps.form.setFieldValue(fieldProps.field.name, option.value)
          } // eslint-disable-line
        />
        {this.getErrorMessageField()}
      </div>
    );
  };

  getElement(name: string): JSX.Element {
    this.getInputElement = this.getInputElement.bind(this);
    return <Field name={name} component={this.getInputElement} />;
  }
}
