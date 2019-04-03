import React from 'react';
import { Switch, Route } from 'react-router';
import authRoutes from '../auth-routes';
import routeMapper from '../routeMapper';
import Core from './Core';

const App = () => (
  <Switch>
    {authRoutes.map(routeMapper)}
    <Route exact path="/" component={Core} />
  </Switch>
);

export default App;
