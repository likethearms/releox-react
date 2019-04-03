import React from 'react';
import CoreuiMainLayout from './CoreuiMainLayout';
import CoreuiSidebar, { CoreuiSidebarMenu } from './CoreuiSidebar';
import CoreuiHeader from './CoreuiHeader';

export interface CoreuiLayoutProps {
  children: JSX.Element | string;
  sidebarMenu: CoreuiSidebarMenu[];
  menuTitle: string;
  brand: JSX.Element | string;
  brandUrl?: string;
}

const CoreuiLayout = ({ children, sidebarMenu, menuTitle, brand, brandUrl }: CoreuiLayoutProps) => (
  <CoreuiMainLayout
    sidebar={<CoreuiSidebar menu={sidebarMenu} />}
    header={(
      <CoreuiHeader
        brandUrl={brandUrl}
        menuTitle={menuTitle}
        title={brand} />
    )}>
    {children}
  </CoreuiMainLayout>
);

export default CoreuiLayout;
