import React from 'react';
import { Field, FieldProps } from 'formik';
import { BaseInput, AbstractBaseInputProps } from '../BaseInput/BaseInput';

export type InputTypes = 'text' | 'email' | 'password' | 'date' | 'number';

export interface InputProps extends AbstractBaseInputProps {
  type?: string;
}

export const Input = (props: InputProps) => {
  const { name, type } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseInput {...props}>
      {({ getInputClass, getErrorMessageField, getId, getPlaceholder }) => (
        <Field name={name}>
          {(fieldProps: FieldProps) => {
            return (
              <>
                <input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...fieldProps.field}
                  type={type || 'text'}
                  id={getId()}
                  placeholder={getPlaceholder()}
                  className={getInputClass(fieldProps)}
                />
                {getErrorMessageField()}
              </>
            );
          }}
        </Field>
      )}
    </BaseInput>
  );
};
