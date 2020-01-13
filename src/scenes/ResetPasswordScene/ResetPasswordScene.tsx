import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Axios from 'axios';
import { Redirect, useLocation } from 'react-router';
import { PasswordForm } from '../../scene-forms/PasswordForm';
import { Loading } from '../../components/Loading/Loading';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { parseAndGetQuery, AccessQuery } from '../../parse-params';
import { validateTokenRequest } from '../../requests';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { apis } from '../../apis';
import { routes } from '../../routes';

interface BodyData {
  newPassword: string;
}

const CONTEXT = 'ResetPasswordScene';

export const ResetPasswordScene = () => {
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

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
      <Formik initialValues={initValues} onSubmit={onSubmit}>
        {() => <PasswordForm context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};
