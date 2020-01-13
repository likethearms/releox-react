import React from 'react';
import { Switch, Route } from 'react-router';
import Core from './Core';
import Components from './Components';
import { getAuthRoutes } from '../auth-routes';
import { routeMapper } from '../routeMapper';
import { GenericIndexScene } from '../generic-scenes/GenericIndexScene/GenericIndexScene';
import {
  listItemAction,
  createItemAction,
  updateItemAction,
  fetchItemAction,
  deleteItemAction,
} from './actions';
import { GenericFormScene } from '../generic-scenes/GenericFormScene/GenericFormScene';
import { Input } from '../components/form/Input/Input';

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
