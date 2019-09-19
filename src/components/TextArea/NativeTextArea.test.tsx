import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { NativeTextArea } from './NativeTextArea';

let wrapper: ShallowWrapper;
let input: ShallowWrapper;

describe('NativeTextArea', () => {
  it('should inject default props', () => {
    wrapper = shallow(<NativeTextArea label="Foo" name="foo" />);
    input = wrapper.find('textarea');
    expect(input.prop('name')).toBe('foo');
    expect(input.prop('id')).toBe('foo-input');
    expect(input.prop('placeholder')).toBe('Foo');
    expect(input.prop('className')).toBe('form-control');
  });

  it('should inject custom props', () => {
    const spy = jest.fn();
    const component = (
      <NativeTextArea
        label="Foo"
        name="foo"
        className="foo-class"
        placeholder="the placeholder"
        onChange={spy}
        value="bar"
      />
    );
    wrapper = shallow(component);
    input = wrapper.find('textarea');
    const onChange = input.prop('onChange') as Function;
    onChange();
    expect(input.prop('id')).toBe('foo-input');
    expect(input.prop('placeholder')).toBe('the placeholder');
    expect(input.prop('className')).toBe('foo-class');
    expect(input.prop('value')).toBe('bar');
    expect(spy).toBeCalledTimes(1);
  });
});
