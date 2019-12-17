import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SuccessScene } from '../../components/SuccessScene';
import { parseAndGetQuery } from '../../parse-params';

export const AuthErrorScene = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    parseAndGetQuery(location, false, ['message']).then((query) =>
      setMessage(query.message as string)
    );
  }, []);

  return <SuccessScene context="AuthErrorScene" subTitle={message} />;
};
