import React from 'react';
import { Field } from 'formik';

export interface CheckBoxProps {
  id?: string;
  name: string;
  label: string;
  inputClass?: string;
  labelClass?: string;
}

export const CheckBox = (props: CheckBoxProps) => {
  const { id, name, label, inputClass, labelClass } = props;
  return (
    <div className="form-check checkbox">
      <Field
        name={name}
        render={({ field }: any) => (
          <input
            type="checkbox"
            id={id || `${name}-input`}
            checked={field.value}
            className={inputClass || 'form-check-input'}
            {...field} /* eslint-disable-line react/jsx-props-no-spreading */
          />
        )}
      />
      <label htmlFor={id || `${name}-input`} className={labelClass || 'form-check-label'}>
        {label}
      </label>
    </div>
  );
};
