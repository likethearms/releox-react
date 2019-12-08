import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'formik';
import { Input } from '../components/form/Input/Input';
import { Button } from '../components/Button/Button';

export interface ForgotFromProps {
  message: string;
  context: string;
}

export const ForgotForm = ({ context, message }: ForgotFromProps) => {
  const { t } = useTranslation('ForgotScene');
  return (
    <Form>
      <Input name="email" label={t('email')} id={`${context}-email-input`} />
      <div className="text-center">{message}</div>
      <Button className="float-right" type="submit" id={`${context}-button`}>
        {t('button')}
      </Button>
    </Form>
  );
};
