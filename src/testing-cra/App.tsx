import React from 'react';
import { Switch, Route } from 'react-router';
import Core from './Core';
import Components from './Components';
import { authRoutes } from '../auth-routes';
import { routeMapper } from '../routeMapper';

const App = () => {
  return (
    <Switch>
      {authRoutes.map(routeMapper)}
      <Route exact path="/" component={Core} />
      <Route exact path="/components" component={Components} />
    </Switch>
  );
};

export default App;
