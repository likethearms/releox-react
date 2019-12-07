import React from 'react';
import { Field, FieldProps } from 'formik';
import { AbstractBaseInputProps, BaseInput } from '../BaseInput/BaseInput';

export interface TextAreaProps extends AbstractBaseInputProps {
  rows?: number;
}

export const TextArea = (props: TextAreaProps) => {
  const { name, rows } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseInput {...props}>
      {({ getInputClass, getErrorMessageField, getId, getPlaceholder }) => (
        <Field name={name}>
          {(fieldProps: FieldProps) => {
            return (
              <>
                <textarea
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...fieldProps.field}
                  rows={rows || 6}
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
