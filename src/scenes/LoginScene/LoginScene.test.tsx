import React from 'react';
import { shallow } from 'enzyme';
import LoginScene from './LoginScene';

describe('onSubmit', () => {
  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginScene onSubmit={onSubmit} />);
    const onSubmitProp = wrapper.find('FormikFormWrapper').props().onSubmit as Function;
    onSubmitProp();
    expect(onSubmit).toBeCalledTimes(1);
  });
});
