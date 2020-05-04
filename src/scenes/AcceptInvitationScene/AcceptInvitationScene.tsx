import Axios, { AxiosError } from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Redirect, useLocation } from 'react-router';
import { getApis } from '../../apis';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Loading } from '../../components/Loading/Loading';
import { getAuthErrorUrl, getErrorMessage } from '../../config';
import { InviteQuery, parseAndGetQuery } from '../../parse-params';
import { validateInvitationTokenRequest } from '../../requests';
import { routes } from '../../routes';
import { InvitationForm } from '../../scene-forms/InvitationForm';

interface BodyData {
  password: string;
}

const CONTEXT = 'AcceptInvitationScene';

export const AcceptInvitationScene = () => {
  const [redirect, setRedirect] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation('AcceptInvitationScene');

  const location = useLocation();

  const redirectToAuthErrorPage = (msg: string): void => {
    setRedirect(getAuthErrorUrl(msg));
  };

  useEffect(() => {
    parseAndGetQuery(location, true, ['uid', 'invitation_token'])
      // eslint-disable-next-line camelcase
      .then(({ uid, invitation_token }: InviteQuery) => {
        setUserId(uid);
        setToken(invitation_token);
        return validateInvitationTokenRequest(uid, invitation_token);
      })
      .then(() => setIsLoading(false))
      .catch((e: AxiosError) => redirectToAuthErrorPage(getErrorMessage(e)));
  }, [location]);

  const onSubmit = (body: BodyData) => {
    let url = getApis().ACCEPT_INVITATION.replace(':invitationToken', token);
    url = url.replace(':userId', userId);
    Axios.post(url, body)
      .then(() => setRedirect(routes.ACCEPT_INVITATION_SUCCESS))
      .catch((e) => setMessage(getErrorMessage(e)));
  };

  const initValues = { password: '' };

  if (redirect) return <Redirect to={redirect} />;
  if (isLoading) return <Loading centeredVertical />;
  return (
    <AuthLayout context={CONTEXT} links={[]}>
      <Helmet>
        <title>{`${t('title')}`}</title>
      </Helmet>
      <Formik initialValues={initValues} onSubmit={onSubmit}>
        {() => <InvitationForm context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};
