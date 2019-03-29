import React from 'react';
import { shallow } from 'enzyme';
import LoginScene from './LoginScene';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';

describe('Props', () => {
  const props = {
    titleText: 'Foo Title',
    subTitleText: 'Foo sub title',
    emailPlaceholder: 'Foo Email',
    forgotPasswordText: 'Foo Forgot Text',
    passwordPlaceholder: 'Foo Password',
  };
  const wrapper = shallow<LoginScene>(<LoginScene {...props} />);

  it('should implement text props', () => {
    expect(wrapper.find({ children: 'Foo Title' }).length).toBe(1);
    expect(wrapper.find({ children: 'Foo sub title' }).length).toBe(1);
    expect(wrapper.find({ children: 'Foo Forgot Text' }).length).toBe(1);
  });

  it('should implement labels', () => {
    expect(wrapper.find({ label: 'Foo Email' }).length).toBe(1);
    expect(wrapper.find({ label: 'Foo Password' }).length).toBe(1);
  });

  it('shouldn\'t show register link by default', () => {
    expect(wrapper.find('Link[to="/register"]').length).toBe(0);
  });

  it('should show register link', () => {
    const w = shallow<LoginScene>(<LoginScene {...props}
      registerUrl="/register"
      registerText="Foo Register Text" />);
    expect(w.find('Link[to="/register"]').length).toBe(1);
    expect(w.find({ children: 'Foo Register Text' }).length).toBe(1);
  });
});

describe('onSubmit', () => {
  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow<LoginScene>(<LoginScene onSubmit={onSubmit} />);
    wrapper.find<FormikFormWrapper>(FormikFormWrapper).props().onSubmit();
    expect(onSubmit).toBeCalledTimes(1);
  });
});

// describe('onError', () => {
//   it('should call onError', async () => {
//     const onError = jest.fn();
//     const wrapper = shallow<LoginScene>(<LoginScene onError={onError} />);
//     await wrapper.find<FormikFormWrapper>(FormikFormWrapper).props().onSubmit();
//     expect(onError).toBeCalledTimes(1);
//   });
// });
