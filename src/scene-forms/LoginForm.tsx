import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'formik';
import { Input } from '../components/form/Input/Input';
import { Button } from '../components/Button/Button';

export interface LoginFromProps {
  loginFieldName: string;
  message: string;
  context: string;
}

export const LoginForm = ({ loginFieldName, context, message }: LoginFromProps) => {
  const { t } = useTranslation('LoginScene');
  return (
    <Form>
      <Input
        name={loginFieldName}
        label={t(`${loginFieldName}`)}
        id={`${context}-${loginFieldName}-input`}
      />
      <Input
        name="password"
        type="password"
        label={t('password')}
        id={`${context}-password-input`}
      />
      <div className="text-center">{message}</div>
      <Button className="float-right" type="submit" id={`${context}-button`}>
        {t('button')}
      </Button>
    </Form>
  );
};
