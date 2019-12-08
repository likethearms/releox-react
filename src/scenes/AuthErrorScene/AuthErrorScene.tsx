import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { SuccessScene } from '../../components/SuccessScene';

export const AuthErrorScene = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = queryString.parse(window.location.search);
    setMessage(query.message as string);
  }, []);

  return <SuccessScene context="AuthErrorScene" subTitle={message} />;
};
