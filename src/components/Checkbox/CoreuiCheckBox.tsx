import React from 'react';
import { Field } from 'formik';
import { CheckBoxProps } from './CheckBox';

export interface CoreuiCheckBoxProps extends CheckBoxProps {
  label: string;
}

interface CoreuiCheckBoxInputProps {
  field: any;
  form: any;
  label: string;
}

const Input = ({ field, form, label }: CoreuiCheckBoxInputProps) => (
  <div className="form-check-inline CoreuiCheckBox">
    <label htmlFor="core-checkbox" className="switch switch-3d switch-primary">
      <input
        className="switch-input"
        id="core-checkbox"
        type="checkbox"
        onChange={() => form.setFieldValue(field.name, !field.value)}
        checked={field.value}
      />
      <span className="switch-slider" />
    </label>
    <label htmlFor="core-checkbox" className="label">{label}</label>
  </div>
);

export const CoreuiCheckBox = (props: CoreuiCheckBoxProps) => {
  const {
    id, name, label,
  } = props;
  return (
    <div className="form-group">
      <Field
        name={name}
        id={id || `${name}-input`}
        render={({ field, form }: any) => (
          <Input field={field} label={label} form={form} />)}
      />
    </div>
  );
};
