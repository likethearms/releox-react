import React from 'react';
import FormikFormWrapper from '../FormikFormWrapper/FormikFormWrapper';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { InputTypes, ButtonType } from '../../typings';

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

const AuthForm = function <T>(props: Props<T>): JSX.Element {
  return (
    <FormikFormWrapper<T>
      onSubmit={props.onSubmit}
      initialValues={props.initialValues as any}>
      <div>
        <Input
          name={props.inputProps.name}
          type={props.inputProps.type}
          label={props.placeholder}
          id={`${props.context}-${props.inputProps.type}-input`}
        />
        <Button
          className="float-right"
          type="submit"
          id={`${props.context}-submit-button`}>
          {props.buttonText}
        </Button>
      </div>
    </FormikFormWrapper>
  );
};

export default AuthForm;
