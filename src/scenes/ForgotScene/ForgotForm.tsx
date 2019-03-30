import React from 'react';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';
import Input, { InputTypes } from '../../components/Input/Input';
import Button, { ButtonType } from '../../components/Button/Button';

interface InputProps {
  name: string;
  id: string;
  type: InputTypes;
}

interface ButtonProps {
  id: string;
}

interface Props<R> {
  placeholder: string;
  initialValues: string;
  buttonText: string;
  inputProps: InputProps;
  buttonProps: ButtonProps;
  context: string;
  onSubmit(body: R): void;
}

const ForgotForm = function<R>(props: Props<R>){
  return (
    <FormikFormWrapper<R>
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}>
      <div>
        <Input
          name={props.inputProps.name}
          type={props.inputProps.type}
          label={props.placeholder}
          id={`${props.context}-${props.inputProps.id}`}
        />
        <Button
          className="float-right"
          type={ButtonType.SUBMIT}
          id={`${props.context}-${props.buttonProps.id}`}>
          {props.buttonText}
        </Button>
      </div>
    </FormikFormWrapper>
  )
}

export default ForgotForm;
