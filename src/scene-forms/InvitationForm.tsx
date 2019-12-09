import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'formik';
import { Input } from '../components/form/Input/Input';
import { Button } from '../components/Button/Button';

export interface ForgotFromProps {
  message: string;
  context: string;
}

export const InvitationForm = ({ context, message }: ForgotFromProps) => {
  const { t } = useTranslation('AcceptInvitationScene');
  return (
    <Form>
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
