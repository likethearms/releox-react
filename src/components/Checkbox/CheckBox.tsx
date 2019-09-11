import React from 'react';
import { Field } from 'formik';

export interface CheckBoxProps {
  id?: string;
  className?: string;
  name: string;
}

export const CheckBox = ({ id, className, name }: CheckBoxProps) => (
  <Field
    name={name}
    id={id || `${name}-input`}
    className={className || 'form-control'}
    render={({ field }: any) => (<input type="checkbox" checked={field.value} {...field} />)} /* eslint-disable-line react/jsx-props-no-spreading */
  />
);
