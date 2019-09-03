import React from 'react';
import CoreuiMainLayout from './CoreuiMainLayout';
import CoreuiSidebar from './CoreuiSidebar';
import CoreuiHeader from './CoreuiHeader';
import { CoreuiLayoutProps } from '../typings';

const CoreuiLayout = (props: CoreuiLayoutProps) => {
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

export default CoreuiLayout;
