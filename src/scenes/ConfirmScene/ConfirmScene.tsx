import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { Redirect } from 'react-router';
import { SuccessScene } from '../../components/SuccessScene';
import { getErrorMessage, getAuthErrorUrl } from '../../config';
import { Loading } from '../../components/Loading/Loading';
import { confirmUserRequest } from '../../requests';
import { parseAndGetQuery } from '../../parse-params';

export const ConfirmScene = () => {
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(true);

  const redirectToAuthErrorPage = (message: string) => {
    setRedirect(getAuthErrorUrl(message));
  };

  useEffect(() => {
    parseAndGetQuery(true, ['uid', 'token'])
      .then((query) => confirmUserRequest(query.uid, query.token))
      .then(() => setLoading(false))
      .catch((e: AxiosError) => redirectToAuthErrorPage(getErrorMessage(e)));
  }, []);

  if (redirect) return <Redirect to={redirect} />;
  if (loading) return <Loading centeredVertical />;
  return <SuccessScene context="ConfirmScene" />;
};
