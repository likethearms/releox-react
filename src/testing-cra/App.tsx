import React from 'react';
import { Switch, Route } from 'react-router';
import CoreuiLayout from '../coreui-layout/CoreuiLayout';
import authRoutes from '../auth-routes';
import routeMapper from '../routeMapper';

const CUI = () => (
  <CoreuiLayout
    sidebarMenu={[]}
    menuTitle={'Another'}
    brandUrl="/coreui"
    brand={'Testi'}
  >
    Foo Bar
  </CoreuiLayout>
);

const App = () => (
  <Switch>
    {authRoutes.map(routeMapper)}
    <Route path={'/coreui'} component={CUI} />
  </Switch>
);

export default App;
