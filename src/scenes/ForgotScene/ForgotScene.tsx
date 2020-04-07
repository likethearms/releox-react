import Axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import { apis } from '../../apis';
import { AuthLayout, AuthLayoutLinkItem } from '../../components/AuthLayout/AuthLayout';
import { getErrorMessage } from '../../config';
import { routes } from '../../routes';
import { ForgotForm } from '../../scene-forms/ForgotForm';

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
      <Helmet>
        <title>{`${t('title')}`}</title>
      </Helmet>
      <Formik initialValues={initValues} onSubmit={submit}>
        {() => <ForgotForm context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};
