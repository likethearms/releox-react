import React from 'react';
import { CoreuiMainLayout } from './CoreuiMainLayout';
import { CoreuiSidebarMenu, CoreuiSidebar } from './CoreuiSidebar';
import { CoreuiHeader } from './CoreuiHeader';

export interface CoreuiLayoutProps {
  children: JSX.Element | string;
  sidebarMenu: CoreuiSidebarMenu[];
  menuTitle: string;
  brand: JSX.Element | string;
  brandUrl?: string;
}

export const CoreuiLayout = (props: CoreuiLayoutProps) => {
  const {
    children, sidebarMenu, menuTitle, brand, brandUrl,
  } = props;
  return (
    <CoreuiMainLayout
      sidebar={<CoreuiSidebar menu={sidebarMenu} />}
      header={(
        <CoreuiHeader
          brandUrl={brandUrl}
          menuTitle={menuTitle}
          title={brand}
        />
      )}
    >
      {children}
    </CoreuiMainLayout>
  );
};
