import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { AxiosError } from 'axios';
import { Redirect } from 'react-router';
import { SuccessScene } from '../../components/SuccessScene';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { Loading } from '../../components/Loading/Loading';
import { confirmUserRequest } from '../../requests';

export const ConfirmScene = () => {
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(true);

  const redirectToAuthErrorPage = (message: string) => {
    setRedirect(getAuthErrorUrl(message));
  };

  useEffect(() => {
    const query = queryString.parse(window.location.search);

    if (!query.uid || !query.token) {
      return redirectToAuthErrorPage('Missing information');
    }

    if (Array.isArray(query.uid) || Array.isArray(query.token)) {
      return redirectToAuthErrorPage('Information is on wrong format');
    }

    confirmUserRequest(query.uid, query.token)
      .then(() => setLoading(false))
      .catch((e: AxiosError) => redirectToAuthErrorPage(getErrorMessage(e)));
    return undefined;
  }, []);

  if (redirect) return <Redirect to={redirect} />;
  if (loading) return <Loading centeredVertical />;
  return <SuccessScene context="ConfirmScene" />;
};
