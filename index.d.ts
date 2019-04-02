import React from 'react';

interface LoginSceneProps {
  onSubmit?: (body: any) => void;
  onError?: (err: Error) => void;
  showRegisterLink?: boolean;
  locale?: any;
}

export class LoginScene extends React.Component<LoginSceneProps, any> { }
