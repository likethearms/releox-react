import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getAccessInformation, destroyAccessInformation } from '../../config';
import { routes } from '../../routes';
import { Loading } from '../../components/Loading/Loading';
import { logoutRequest } from '../../requests';

export const LogoutScene = () => {
  const [redirect, setRedirect] = useState('');

  const afterRequest = () => {
    destroyAccessInformation().then(() => setRedirect(routes.LOGIN));
  };

  useEffect(() => {
    getAccessInformation()
      .then(({ accessToken }) => logoutRequest(accessToken))
      .then(afterRequest)
      .catch(afterRequest);
  }, []);

  if (redirect) return <Redirect to={redirect} />;
  return <Loading centeredVertical />;
};
