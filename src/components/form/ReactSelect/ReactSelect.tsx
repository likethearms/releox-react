import React from 'react';
import Select from 'react-select';
import { FieldProps, Field } from 'formik';
import { BaseInput, AbstractBaseInputProps } from '../BaseInput/BaseInput';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends AbstractBaseInputProps {
  options: Option[];
  className?: string;
  placeholder?: string;
}

export const ReactSelect = (props: SelectProps) => {
  const { name, options } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseInput {...props}>
      {({ getInvalidClass, getErrorMessageField, getId, getPlaceholder }) => (
        <Field name={name}>
          {(fieldProps: FieldProps) => {
            return (
              <div className="ReactSelectHelper">
                <Select
                  {...fieldProps.field} // eslint-disable-line
                  id={getId()}
                  options={options}
                  classNamePrefix="ReactSelect"
                  placeholder={getPlaceholder()}
                  className={getInvalidClass(fieldProps)}
                  value={options.find((option: Option) => option.value === fieldProps.field.value)}
                  onChange={(option: any) => fieldProps.form.setFieldValue(name, option.value)}
                />
                {getErrorMessageField()}
              </div>
            );
          }}
        </Field>
      )}
    </BaseInput>
  );
};
