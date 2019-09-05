import React from 'react';
import { Route } from 'react-router';
import { ReleoxRoutes } from './routes';

export const routeMapper = (r: ReleoxRoutes) => (
  <Route exact key={r.url} path={r.url} component={r.component} />
);
