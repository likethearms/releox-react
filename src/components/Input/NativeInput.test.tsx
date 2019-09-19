import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { NativeInput } from './NativeInput';

let wrapper: ShallowWrapper;
let input: ShallowWrapper;

describe('NativeInput', () => {
  it('should inject default props', () => {
    wrapper = shallow(<NativeInput label="Foo" name="foo" />);
    input = wrapper.find('input');
    expect(input.prop('name')).toBe('foo');
    expect(input.prop('id')).toBe('foo-input');
    expect(input.prop('type')).toBe('text');
    expect(input.prop('placeholder')).toBe('Foo');
    expect(input.prop('className')).toBe('form-control');
  });

  it('should inject custom props', () => {
    const spy = jest.fn();
    const component = (
      <NativeInput
        label="Foo"
        name="foo"
        type="number"
        className="foo-class"
        placeholder="the placeholder"
        onChange={spy}
        value="bar"
      />
    );
    wrapper = shallow(component);
    input = wrapper.find('input');
    const onChange = input.prop('onChange') as Function;
    onChange();
    expect(input.prop('id')).toBe('foo-input');
    expect(input.prop('type')).toBe('number');
    expect(input.prop('placeholder')).toBe('the placeholder');
    expect(input.prop('className')).toBe('foo-class');
    expect(input.prop('value')).toBe('bar');
    expect(spy).toBeCalledTimes(1);
  });
});
