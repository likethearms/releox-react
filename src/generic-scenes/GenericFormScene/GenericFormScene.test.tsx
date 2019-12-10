import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import thunk from 'redux-thunk';
import { Input } from '../../components/form/Input/Input';
import { createGenericFormScene } from './GenericFormScene';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const F = () => (
  <div>
    <Input name="name" label="Name" />
  </div>
);

describe('create-generic-form-scene', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: {
        model: {
          data: {
            country: 'United States',
          },
        },
      },
      entry: {
        model: {
          data: { name: 'Store name' },
        },
      },
    });
  });

  it('should show all key elements on create scene', () => {
    const spy = jest.fn();
    const save = (a: any) => () => spy(a);
    const El: any = createGenericFormScene({
      title: 'Create form',
      EmbedForm: F,
      initialValues: { name: 'Foo Bar' },
      saveAction: save,
      reduxEntry: 'entry',
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/record/new']}>
          <Route component={El} path="/record/new" />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="name"]').prop('value')).toBe('Foo Bar');
    expect(wrapper.find('h5[children="Create form"]')).toHaveLength(1);
    expect(wrapper.find('button[children="Takaisin"]')).toHaveLength(1);
    expect(wrapper.find('button[children="Tallenna"]')).toHaveLength(1);
    expect(wrapper.find('button[children="Poista"]')).toHaveLength(0);
    const onSubmit = wrapper.find('Formik').prop('onSubmit') as () => void;
    onSubmit();
    expect(spy).toBeCalledTimes(1);
  });

  it('should show all key elements on edit scene', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    const save = (a: any) => () => spy1(a);
    const fetch = (a: any) => () => spy2(a);
    const del = (a: any) => () => spy3(a);
    const El: any = createGenericFormScene({
      title: 'Create form',
      EmbedForm: F,
      saveAction: save,
      initialValues: {},
      fetchAction: fetch,
      delAction: del,
      reduxEntry: 'entry',
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/record/1']}>
          <Route component={El} path="/record/:id" />
        </MemoryRouter>
      </Provider>
    );
    // Fetch
    expect(spy2).toBeCalledTimes(1);

    // Delete
    expect(wrapper.find('button[children="Poista"]')).toHaveLength(1);
    const onClick = wrapper.find('button[children="Poista"]').prop('onClick') as () => void;
    onClick();
    expect(spy3).toBeCalledTimes(1);

    // Back
    const onBack = wrapper.find('button[children="Takaisin"]').prop('onClick') as () => void;
    onBack();

    // Update on submit
    const onSubmit = wrapper.find('Formik').prop('onSubmit') as () => void;
    onSubmit();
    expect(spy1).toBeCalledWith('1');

    expect(wrapper.find('Formik').prop('initialValues')).toEqual({
      name: 'Store name',
    });
  });

  it('should show loading indicator', () => {
    const spy1 = jest.fn();
    const save = (a: any) => () => spy1(a);
    const store2 = mockStore({
      entry: {
        model: {
          isLoading: true,
          data: { name: 'Store name' },
        },
      },
    });
    const El: any = createGenericFormScene({
      title: 'Create form',
      EmbedForm: F,
      initialValues: { name: 'Foo Bar' },
      saveAction: save,
      reduxEntry: 'entry',
    });
    const wrapper = mount(
      <Provider store={store2}>
        <MemoryRouter initialEntries={['/record/1']}>
          <Route component={El} path="/record/:id" />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Loading')).toHaveLength(1);
  });
});
