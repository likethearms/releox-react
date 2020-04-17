import React from 'react';
import { Route, Switch } from 'react-router';
import { getAuthRoutes } from '../auth-routes';
import { Input } from '../components/form/Input/Input';
import { GenericFormScene } from '../generic-scenes/GenericFormScene/_GenericFormScene';
import { GenericIndexScene } from '../generic-scenes/GenericIndexScene/GenericIndexScene';
import { routeMapper } from '../routeMapper';
import {
  createItemAction,
  deleteItemAction,
  fetchItemAction,
  listItemAction,
  updateItemAction,
} from './actions';
import Components from './Components';
import Core from './Core';

const Index = () => (
  <GenericIndexScene
    title="Foo"
    reduxEntry="itemReducer"
    listAction={listItemAction}
    createLink="/create"
    redirectUrl="/edit/:id"
    dataTableProps={{
      columns: [
        { dataField: 'id', text: 'ID' },
        { dataField: 'name', text: 'Name' },
      ],
    }}
  />
);

const EForm = () => (
  <>
    <Input name="name" label="Name" />
  </>
);

const Create = () => (
  <GenericFormScene
    title="Foo"
    reduxEntry="itemReducer"
    redirectUrl="/index"
    initialValues={{ name: '' }}
    EmbedForm={EForm}
    saveAction={createItemAction}
  />
);
const Edit = () => (
  <GenericFormScene
    title="Foo"
    reduxEntry="itemReducer"
    redirectUrl="/index"
    initialValues={{ name: '' }}
    EmbedForm={EForm}
    saveAction={updateItemAction}
    delAction={deleteItemAction}
    fetchAction={fetchItemAction}
  />
);

const App = () => {
  return (
    <Switch>
      {getAuthRoutes().map(routeMapper)}
      <Route exact path="/" component={Core} />
      <Route exact path="/components" component={Components} />
      <Route exact path="/index" component={Index} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/edit/:id" component={Edit} />
    </Switch>
  );
};

export default App;
