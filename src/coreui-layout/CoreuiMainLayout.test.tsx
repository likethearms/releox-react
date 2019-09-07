import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { CoreuiMainLayout } from './CoreuiMainLayout';

let wrapper: ReactWrapper;

const children = <span>Children</span>;
const header = <span>Header</span>;
const sidebar = <span>Sidebar</span>;


xdescribe('CoreuiMain', () => {
  beforeAll(() => {
    wrapper = mount((
      <CoreuiMainLayout
        header={header}
        sidebar={sidebar}
      >
        {children}
      </CoreuiMainLayout>
    ));
  });

  it('should have app class', () => {
    expect(wrapper.find('.app')).toHaveLength(1);
  });

  it('should render header', () => {
    expect(wrapper.find('[children="Children"]')).toHaveLength(1);
  });

  it('should render sidebar', () => {
    expect(wrapper.find('[children="Header"]')).toHaveLength(1);
  });

  it('should render children', () => {
    expect(wrapper.find('[children="Sidebar"]')).toHaveLength(1);
  });
});
