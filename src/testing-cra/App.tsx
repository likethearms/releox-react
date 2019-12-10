import React from 'react';
import { Switch, Route } from 'react-router';
import Core from './Core';
import Components from './Components';
import { authRoutes } from '../auth-routes';
import { routeMapper } from '../routeMapper';
import { GenericIndexScene } from '../generic-scenes/GenericIndexScene/GenericIndexScene';
import { listItemAction } from './actions';

const Index = () => (
  <GenericIndexScene
    title="Foo"
    reduxEntry="itemReducer"
    listAction={listItemAction}
    createLink="/index"
    dataTableProps={{ columns: [{ dataField: 'id', text: 'ID' }] }}
  />
);

const App = () => {
  return (
    <Switch>
      {authRoutes.map(routeMapper)}
      <Route exact path="/" component={Core} />
      <Route exact path="/components" component={Components} />
      <Route exact path="/index" component={Index} />
    </Switch>
  );
};

export default App;
