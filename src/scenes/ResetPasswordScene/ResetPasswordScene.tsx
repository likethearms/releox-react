import Axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Redirect, useLocation } from 'react-router';
import { apis } from '../../apis';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Loading } from '../../components/Loading/Loading';
import { getAuthErrorUrl, getErrorMessage, getReleoxOption } from '../../config';
import { AccessQuery, parseAndGetQuery } from '../../parse-params';
import { validateTokenRequest } from '../../requests';
import { routes } from '../../routes';
import { PasswordForm } from '../../scene-forms/PasswordForm';

interface BodyData {
  newPassword: string;
}

const CONTEXT = 'ResetPasswordScene';

export const ResetPasswordScene = () => {
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const { t } = useTranslation('ResetPasswordScene');

  const location = useLocation();

  useEffect(() => {
    parseAndGetQuery(location, true)
      // eslint-disable-next-line camelcase
      .then(({ user, access_token }: AccessQuery) => {
        setAccessToken(access_token);
        return validateTokenRequest(user, access_token);
      })
      .then(() => setIsLoading(false))
      .catch((e) => setRedirect(getAuthErrorUrl(getErrorMessage(e))));
  }, [location]);

  const onSubmit = (body: BodyData) => {
    setMessage('');
    Axios.post(`${apis.PASSWORD_RESET}?access_token=${accessToken}`, body)
      .then(() => setRedirect(routes.RESET_SUCCESS))
      .catch((e) => setMessage(getErrorMessage(e)));
  };

  const initValues = { newPassword: '' };

  if (redirect) return <Redirect to={redirect} />;
  if (isLoading) return <Loading centeredVertical />;
  return (
    <AuthLayout context={CONTEXT} links={[]}>
      <Helmet>
        <title>{`${t('siteTitle')} | ${getReleoxOption('siteTitle')}`}</title>
      </Helmet>
      <Formik initialValues={initValues} onSubmit={onSubmit}>
        {() => <PasswordForm context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};
