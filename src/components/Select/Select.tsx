import React from 'react';
import { Field, FieldProps } from 'formik';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';

interface SelectOption {
  value: string | number;
  label: string | number;
}

interface Props extends AbstractInputGroupProps {
  options: SelectOption[];
}

export class Select extends AbstractFormikInputGroup<Props> {
  getElement(name: string, id?: string) {
    const { options } = this.props;
    const Element = (fieldProps: FieldProps) => (
      <div>
        <select
          {...fieldProps.field} // eslint-disable-line
          id={id || `${name}-input`}
          className={`form-control ${this.getInvalidClass(fieldProps)}`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {this.getErrorMessageField()}
      </div>
    );
    return <Field name={name} render={Element} />;
  }
}
