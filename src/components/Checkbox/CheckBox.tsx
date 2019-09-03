import React from 'react';
import { Field } from 'formik';
import { CheckBoxProps } from '../../typings';

const CheckBox = ({ id, className, name }: CheckBoxProps) => (
  <Field
    name={name}
    id={id || `${name}-input`}
    className={className || 'form-control'}
    render={({ field }: any) => (<input type="checkbox" checked={field.value} {...field} />)} /* eslint-disable-line react/jsx-props-no-spreading */
  />
);

export default CheckBox;
