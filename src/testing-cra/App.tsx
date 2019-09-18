import React from 'react';
import { Switch, Route } from 'react-router';
import Core from './Core';
import Components from './Components';
import { authRoutes } from '../auth-routes';
import { routeMapper } from '../routeMapper';

const App = () => (
  <Switch>
    {authRoutes.map(routeMapper)}
    <Route exact path="/components" component={Components} />
    <Route exact path="/" component={Core} />
  </Switch>
);

export default App;
