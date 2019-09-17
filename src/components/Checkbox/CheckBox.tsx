import React from 'react';
import { Field } from 'formik';

export interface CheckBoxProps {
  id?: string;
  name: string;
  label: string;
}

export const CheckBox = (props: CheckBoxProps) => {
  const {
    id, name, label,
  } = props;
  return (
    <div className="form-check checkbox">
      <Field
        name={name}
        label="name"
        id={id || `${name}-input`}
        render={({ field }: any) => (<input type="checkbox" checked={field.value} className="form-check-input" {...field} />)} /* eslint-disable-line react/jsx-props-no-spreading */
      />
      <label htmlFor={id || `${name}-input`} className="form-check-label">{label}</label>
    </div>
  );
};
