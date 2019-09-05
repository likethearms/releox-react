import React from 'react';
import { CoreuiLayout } from '../coreui-layout/CoreuiLayout';
import { Input } from '../components/Input/Input';
import { validateModel } from '../HOC/validate-model';
import { authMiddleware } from '../HOC/auth-middleware';

const CUI = ({ user }: any) => (
  <CoreuiLayout
    sidebarMenu={[]}
    menuTitle={user.name}
    brandUrl="/"
    brand="Testi"
  >
    Foo Bar
  </CoreuiLayout>
);

const Form = () => (
  <div>
    <Input label="Name" name="name" id="name" />
  </div>
);

export default authMiddleware(validateModel(['name'], Form, CUI));
