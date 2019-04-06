import React from 'react';
import { Field } from 'formik';
import { CoreuiCheckBoxProps } from '../../typings';

const CoreuiCheckBox = ({ id, className, name, label }: CoreuiCheckBoxProps) => (
  <div className="form-group">
    <Field
      name={name}
      id={id || `${name}-input`}
      className={className || 'form-control'}
      render={({ field, form }: any) => (
        <div className="form-check-inline CoreuiCheckBox">
          <label className="switch switch-3d switch-primary">
            <input
              className="switch-input"
              type="checkbox"
              onChange={() => form.setFieldValue(field.name, !field.value)} checked={field.value} />
            <span className="switch-slider"></span>
          </label>
          <label className="label">{label}</label>
        </div>
      )}
    />
  </div>
);

export default CoreuiCheckBox;
