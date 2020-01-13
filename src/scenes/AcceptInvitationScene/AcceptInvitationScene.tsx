import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Redirect, useLocation } from 'react-router';
import Axios, { AxiosError } from 'axios';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { apis } from '../../apis';
import { routes } from '../../routes';
import { validateInvitationTokenRequest } from '../../requests';
import { InvitationForm } from '../../scene-forms/InvitationForm';
import { Loading } from '../../components/Loading/Loading';
import { parseAndGetQuery, InviteQuery } from '../../parse-params';

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
    let url = apis.ACCEPT_INVITATION.replace(':invitationToken', token);
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
      <Formik initialValues={initValues} onSubmit={onSubmit}>
        {() => <InvitationForm context={CONTEXT} message={message} />}
      </Formik>
    </AuthLayout>
  );
};
