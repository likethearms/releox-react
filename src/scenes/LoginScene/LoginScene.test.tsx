import React from 'react';
import { shallow } from 'enzyme';
import LoginScene from './LoginScene';
import FormikFormWrapper from '../../components/FormikFormWrapper/FormikFormWrapper';

describe('onSubmit', () => {
  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow<LoginScene>(<LoginScene onSubmit={onSubmit} />);
    wrapper.find<FormikFormWrapper>(FormikFormWrapper).props().onSubmit();
    expect(onSubmit).toBeCalledTimes(1);
  });
});
