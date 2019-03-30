import React from 'react';
import { Switch, Route } from 'react-router';
import { URL } from '../routes';
import LoginScene from '../scenes/LoginScene/LoginScene';
import ForgotScene from '../scenes/ForgotScene/ForgotScene';
import ForgotSuccessScene from '../scenes/ForgotSuccessScene/ForgotSuccessScene';
import ResetPasswordScene from '../scenes/ResetPasswordScene/ResetPasswordScene';
import ResetPasswordSuccessScene
  from '../scenes/ResetPasswordSuccessScene/ResetPasswordSuccessScene';

const App = () => (
  <Switch>
    <Route path={URL.LOGIN} component={LoginScene} />
    <Route path={URL.RESET} component={ResetPasswordScene} />
    <Route path={URL.RESET_SUCCESS} component={ResetPasswordSuccessScene} />
    <Route path={URL.FORGOT} component={ForgotScene} />
    <Route path={URL.FORGOT_SUCCESS} component={ForgotSuccessScene} />
  </Switch>
);

export default App;
