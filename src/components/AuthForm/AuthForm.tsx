import React from 'react';
import FormikFormWrapper from '../FormikFormWrapper/FormikFormWrapper';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { InputTypes } from '../../typings';

interface InputProps {
  name: string;
  type: InputTypes;
}

interface Props<T> {
  placeholder: string;
  initialValues: T;
  buttonText: string;
  inputProps: InputProps;
  context: string;
  onSubmit(body: T): void;
}

const AuthForm = <T extends {}>(props: Props<T>): JSX.Element => {
  const {
    onSubmit, initialValues, inputProps, placeholder, context, buttonText,
  } = props;
  return (
    <FormikFormWrapper
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <div>
        <Input
          name={inputProps.name}
          type={inputProps.type}
          label={placeholder}
          id={`${context}-${inputProps.type}-input`}
        />
        <Button
          className="float-right"
          type="submit"
          id={`${context}-submit-button`}
        >
          {buttonText}
        </Button>
      </div>
    </FormikFormWrapper>
  );
};

export default AuthForm;
