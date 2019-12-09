import React from 'react';
import { CoreuiLayout } from '../coreui-layout/CoreuiLayout';
import { Input } from '../components/form/Input/Input';
import { validateModel } from '../HOC/validate-model/validate-model';
import { authMiddleware } from '../HOC/auth-middleware';

const CUI = ({ authenticatedUser }: any) => (
  <CoreuiLayout
    sidebarMenu={[]}
    headerRightText={authenticatedUser.name}
    brandUrl="/"
    brand="Testi"
  >
    Foo Bar
  </CoreuiLayout>
);

const Form = () => (
  <div>
    <Input label="Name" name="foo" id="name" />
  </div>
);

export default authMiddleware(validateModel(['fooz'], Form)(CUI));
