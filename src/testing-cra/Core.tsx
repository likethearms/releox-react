import React from 'react';
import CoreuiLayout from '../coreui-layout/CoreuiLayout';
import authMiddleware from '../HOC/auth-middleware';
import validateModel from '../HOC/validate-model';
import Input from '../components/Input/Input';

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

const Core = authMiddleware(validateModel(['name'], Form, CUI));
export default Core;
