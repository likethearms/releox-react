import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { AuthLayout } from './AuthLayout';

let wrapper: ReactWrapper;

describe('AuthLayout', () => {
  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <AuthLayout
          context="Context"
          title="Title"
          subTitle="Subtitle"
          message="This is message"
          links={[
            { to: '/foo', id: 'foo-id', text: 'Foo' },
            { to: '/bar', id: 'bar-id', text: 'Bar' },
          ]}
        >
          Foo Content
        </AuthLayout>
      </MemoryRouter>
    );
  });

  it('should inject context', () => {
    expect(wrapper.find('#Context')).toHaveLength(1);
  });

  it('should show title', () => {
    expect(wrapper.find('h5[children="Title"]')).toHaveLength(1);
  });

  it('should show subTitle', () => {
    expect(wrapper.find('[children="Subtitle"]')).toHaveLength(1);
  });

  it('should render children', () => {
    expect(wrapper.find('[children="Foo Content"]')).toHaveLength(1);
  });

  it('should render links', () => {
    expect(wrapper.find('a[children="Foo"]')).toHaveLength(1);
    expect(wrapper.find('a[children="Bar"]')).toHaveLength(1);
  });

  it('should show message', () => {
    expect(wrapper.find('[children="This is message"]')).toHaveLength(1);
  });
});
