import React from 'react';
import { Switch, Route } from 'react-router';
import CoreuiLayout from '../coreui-layout/CoreuiLayout';
import authRoutes from '../auth-routes';
import routeMapper from '../routeMapper';
import authMiddleware from '../HOC/auth-middleware';

const CUI = (props: any) => (
  <CoreuiLayout
    sidebarMenu={[]}
    menuTitle={props.user.name}
    brandUrl="/home"
    brand={'Testi'}
  >
    Foo Bar
  </CoreuiLayout>
);

const App = () => (
  <Switch>
    {authRoutes.map(routeMapper)}
    <Route path={'/home'} component={authMiddleware(CUI)} />
  </Switch>
);

export default App;
