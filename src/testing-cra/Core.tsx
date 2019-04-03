import React from 'react';
import CoreuiLayout from '../coreui-layout/CoreuiLayout';
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

const Core = authMiddleware(CUI);
export default Core;
