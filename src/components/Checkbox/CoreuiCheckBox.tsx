import React from 'react';
import { Field } from 'formik';
import { CoreuiCheckBoxProps } from '../../typings';

const CoreuiCheckBox = (props: CoreuiCheckBoxProps) => {
  const {
    id, className, name, label,
  } = props;
  return (
    <div className="form-group">
      <Field
        name={name}
        id={id || `${name}-input`}
        className={className || 'form-control'}
        render={({ field, form }: any) => (
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
        )}
      />
    </div>
  );
};

export default CoreuiCheckBox;
