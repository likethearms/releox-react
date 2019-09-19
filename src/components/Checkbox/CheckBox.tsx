import React from 'react';
import { Field } from 'formik';

export interface CheckBoxProps {
  id?: string;
  onChange?: Function;
  name: string;
  label: string;
  inputClass?: string;
  labelClass?: string;
}

export const CheckBox = (props: CheckBoxProps) => {
  const { id, name, onChange, label, inputClass, labelClass } = props;
  return (
    <div className="form-check checkbox">
      <Field
        name={name}
        id={id || `${name}-input`}
        render={({ field }: any) => (
          <input
            type="checkbox"
            checked={field.value}
            className={inputClass || 'form-check-input'}
            {...field} /* eslint-disable-line react/jsx-props-no-spreading */
            onChange={(e) => {
              if (onChange) onChange(e);
              field.onChange(e);
            }}
          />
        )}
      />
      <label htmlFor={id || `${name}-input`} className={labelClass || 'form-check-label'}>
        {label}
      </label>
    </div>
  );
};
