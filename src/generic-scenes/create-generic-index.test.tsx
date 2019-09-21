import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createGenericIndex } from './create-generic-index';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('create-generic-index', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      entry: {
        list: {
          data: [{ id: 1 }],
          count: 1,
        },
      },
    });
  });

  it('should call list and expect default order', () => {
    const spy = jest.fn();
    const list = (a: any) => () => spy(a);
    const Component: any = createGenericIndex({
      title: 'Foo title',
      reduxEntry: 'entry',
      listAction: list,
      dataTableProps: {
        columns: [{ text: '#', dataField: 'id' }],
      },
    });
    const connectedComponent = () => (
      <Provider store={store}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>
    );

    const wrapper = mount(connectedComponent());
    expect(spy).toBeCalledWith({ limit: 20, order: 'id asc', skip: 0 });
    expect(wrapper.find('DataTable').prop('defaultSorted')).toEqual({
      dataField: 'id',
      order: 'asc',
    });
  });

  it('should setup custom order', () => {
    const spy = jest.fn();
    const list = (a: any) => () => spy(a);
    const Component: any = createGenericIndex({
      title: 'Foo title',
      reduxEntry: 'entry',
      listAction: list,
      dataTableProps: {
        columns: [{ text: '#', dataField: 'id' }],
        defaultSorted: { dataField: 'name', order: 'asc' },
      },
    });
    const connectedComponent = () => (
      <Provider store={store}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>
    );

    const wrapper = mount(connectedComponent());
    expect(wrapper.find('DataTable').prop('defaultSorted')).toEqual({
      dataField: 'name',
      order: 'asc',
    });
  });

  it('should call create new button', () => {
    const spy = jest.fn();
    const list = (a: any) => () => spy(a);
    const Component: any = createGenericIndex({
      title: 'Foo title',
      reduxEntry: 'entry',
      listAction: list,
      dataTableProps: { columns: [{ text: '#', dataField: 'id' }] },
      createLink: '/create',
      redirectUrl: '/show/:id',
    });
    const connectedComponent = () => (
      <Provider store={store}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>
    );

    const wrapper = mount(connectedComponent());
    expect(wrapper.find('[to="/create"]')).toHaveLength(1);
  });

  it('should test that onClick call redirect', () => {
    const spy = jest.fn();
    const list = (a: any) => () => spy(a);
    const Component: any = createGenericIndex({
      title: 'Foo title',
      reduxEntry: 'entry',
      listAction: list,
      dataTableProps: {
        columns: [{ text: '#', dataField: 'id' }],
        defaultSorted: { dataField: 'id', order: 'asc' },
      },
      redirectUrl: '/show/:id',
    });
    const connectedComponent = () => (
      <Provider store={store}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>
    );

    const wrapper = mount(connectedComponent());
    const foo = wrapper.find('DataTable').prop('onClick') as Function;
    expect(foo(1, { id: 1 })).toEqual({
      payload: { args: ['/show/1'], method: 'push' },
      type: '@@router/CALL_HISTORY_METHOD',
    });
  });
});
