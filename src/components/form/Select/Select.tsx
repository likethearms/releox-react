import React from 'react';
import { Field, FieldProps } from 'formik';
import { BaseInput, AbstractBaseInputProps } from '../BaseInput/BaseInput';

export interface SelectOption {
  value: string | number;
  label: string | number;
}

interface Props extends AbstractBaseInputProps {
  options: SelectOption[];
}

export const Select = (props: Props) => {
  const { name, options } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseInput {...props}>
      {({ getInputClass, getErrorMessageField, getId }) => (
        <Field name={name}>
          {(fieldProps: FieldProps) => {
            return (
              <>
                <select
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...fieldProps.field}
                  id={getId()}
                  className={getInputClass(fieldProps)}
                >
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {getErrorMessageField()}
              </>
            );
          }}
        </Field>
      )}
    </BaseInput>
  );
};
