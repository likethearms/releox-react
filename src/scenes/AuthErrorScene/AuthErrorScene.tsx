import React, { useEffect, useState } from 'react';
import { SuccessScene } from '../../components/SuccessScene';
import { parseAndGetQuery } from '../../parse-params';

export const AuthErrorScene = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    parseAndGetQuery(false, ['message']).then((query) => setMessage(query.message as string));
  }, []);

  return <SuccessScene context="AuthErrorScene" subTitle={message} />;
};
