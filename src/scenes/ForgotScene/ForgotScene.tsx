import React, { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { routes } from '../../routes';
import { AuthLayoutLinkItem, AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { ForgotForm } from '../../scene-forms/ForgotForm';
import { apis } from '../../apis';
import { getErrorMessage } from '../../config';

interface BodyData {
  email: string;
}

const CONTEXT = 'ForgotScene';

export const ForgotScene = () => {
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('');

  const { t } = useTranslation('ForgotScene');

  const getLinks = (): AuthLayoutLinkItem[] => {
    return [
      {
        id: 'back-link',
        to: routes.LOGIN,
        text: t('linkText'),
      },
    ];
  };

  const submit = (body: BodyData) => {
    setMessage('');
    Axios.post(apis.FORGOT, body)
      .then(() => setRedirect(routes.FORGOT_SUCCESS))
      .catch((e) => setMessage(getErrorMessage(e)));
  };

  const initValues = { email: '' };

  if (redirect) return <Redirect to={redirect} />;
  return (
    <AuthLayout context={CONTEXT} links={getLinks()}>
      <Formik initialValues={initValues} onSubmit={submit}>
        {() => <ForgotForm context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};
