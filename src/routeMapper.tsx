import React from 'react';
import { Route } from 'react-router';
import { ReleoxRoutes } from './typings';

export default (r: ReleoxRoutes) => (
  <Route exact key={r.url} path={r.url} component={r.component} />
);
