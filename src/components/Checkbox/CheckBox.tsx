import React from 'react';
import { Field } from 'formik';

export interface CheckBoxProps {
  id?: string;
  className?: string;
  onChange?: Function;
  name: string;
}

export const CheckBox = (props: CheckBoxProps) => {
  const {
    id, className, name, onChange,
  } = props;
  return (
    <Field
      name={name}
      id={id || `${name}-input`}
      className={className || 'form-control'}
      render={({ field }: any) => (
        <input
          type="checkbox"
          checked={field.value}
          {...field} /* eslint-disable-line react/jsx-props-no-spreading */
          onChange={(e) => {
            if (onChange) onChange(e);
            field.onChange(e);
          }}
        />
      )}
    />
  );
};
