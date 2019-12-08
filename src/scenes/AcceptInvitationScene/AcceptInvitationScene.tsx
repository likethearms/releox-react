import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router';
import queryString from 'query-string';
import Axios, { AxiosError } from 'axios';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { apis } from '../../apis';
import { routes } from '../../routes';
import { validateInvitationTokenRequest } from '../../requests';
import { InvitationForm } from '../../scene-forms/InvitationForm';
import { Loading } from '../../components/Loading/Loading';

interface BodyData {
  password: string;
}

const CONTEXT = 'AcceptInvitation';

export const AcceptInvitationScene = () => {
  const [redirect, setRedirect] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const redirectToAuthErrorPage = (msg: string): void => {
    setRedirect(getAuthErrorUrl(msg));
  };

  useEffect(() => {
    const query = queryString.parse(window.location.search);

    if (!query.uid || !query.invitation_token) {
      return redirectToAuthErrorPage('Missing information');
    }

    if (Array.isArray(query.uid) || Array.isArray(query.invitation_token)) {
      return redirectToAuthErrorPage('Information is on wrong format');
    }

    validateInvitationTokenRequest(query.uid, query.invitation_token)
      .then(() => {
        setUid(query.uid as string);
        setToken(query.invitation_token as string);
        setIsLoading(false);
      })
      .catch((e: AxiosError) => redirectToAuthErrorPage(getErrorMessage(e)));
    return undefined;
  }, []);

  const onSubmit = (body: BodyData) => {
    const url = apis.ACCEPT_INVITATION.replace(':userId', uid).replace(':invitationToken', token);
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
