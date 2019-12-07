import React from 'react';
import { Formik, Form } from 'formik';
import { Input, InputTypes } from '../form/Input/Input';
import { Button } from '../Button/Button';

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

export const AuthForm = <T extends {}>(props: Props<T>): JSX.Element => {
  const { onSubmit, initialValues, inputProps, placeholder, context, buttonText } = props;
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {() => (
        <Form>
          <Input
            name={inputProps.name}
            type={inputProps.type}
            label={placeholder}
            id={`${context}-${inputProps.type}-input`}
          />
          <Button className="float-right" type="submit" id={`${context}-submit-button`}>
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
