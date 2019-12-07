import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import getValue from 'get-value';

export type InputTypes = 'text' | 'email' | 'password' | 'date' | 'number';

export type getErrorMessageField = () => JSX.Element;
export type getInputClass = (formikProps: FieldProps) => string;
export type getInvalidClass = (formikProps: FieldProps) => string;
export type getId = () => string;
export type getPlaceholder = () => string;

export interface BaseInputProps {
  getErrorMessageField: getErrorMessageField;
  getInputClass: getInputClass;
  getId: getId;
  getPlaceholder: getPlaceholder;
  getInvalidClass: getInvalidClass;
}

export interface AbstractBaseInputProps {
  id?: string;
  label: string;
  name: string;
  inline?: boolean;
  inlineLabelWidth?: number;
  placeholder?: string;
  labelClass?: string;
  className?: string;
}

export interface BaseInput extends AbstractBaseInputProps {
  children(props: BaseInputProps): JSX.Element;
}

export const BaseInput = <T extends BaseInput>(props: T) => {
  const {
    id,
    label,
    name,
    inline,
    inlineLabelWidth,
    labelClass,
    className,
    children,
    placeholder,
  } = props;

  const getErrorMessageField = () => (
    <div className="invalid-feedback">
      <ErrorMessage name={name} />
    </div>
  );

  const getInvalidClass = ({ field, form: { touched, errors } }: FieldProps) =>
    getValue(errors, field.name) && getValue(touched, field.name) ? 'is-invalid' : '';

  const getInputClass = (fieldProps: FieldProps) =>
    `form-control ${className || ''} ${getInvalidClass(fieldProps)}`;

  const getId = () => id || `${name}-input`;
  const getPlaceholder = () => placeholder || label;

  let inlineWidth = 4;
  if (typeof inlineLabelWidth === 'number') inlineWidth = inlineLabelWidth;
  const inputWidth = 12 - inlineWidth;
  return (
    <div className={`form-group ${inline ? 'row' : ''}`}>
      <label
        htmlFor={id || `${name}-input`}
        className={`${labelClass || ''} ${inline ? `col-md-${inlineWidth} col-form-label` : ''}`}
      >
        {label}
      </label>
      <div className={inline ? `col-md-${inputWidth}` : ''}>
        {children({ getErrorMessageField, getInputClass, getPlaceholder, getId, getInvalidClass })}
      </div>
    </div>
  );
};
