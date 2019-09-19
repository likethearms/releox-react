import React from 'react';
import { shallow } from 'enzyme';
import { AsyncSelectFormikWrapper } from './AsyncSelectFormikWrapper';

describe('AsyncSelectFormikWrapper', () => {
  const setFieldValue = jest.fn();
  const wrapper = shallow(
    <AsyncSelectFormikWrapper
      getUrl="fooUrl"
      field={{ value: 'bar', name: 'fieldName' }}
      queryFormat="mongodb"
      form={{ setFieldValue } as any}
      placeholder="fooPlaceholder"
    />
  );
  const select = wrapper.find('AsyncSelect');

  it('should inject value', () => {
    expect(select.prop('value')).toBe('bar');
  });

  it('should inject getUrl', () => {
    expect(select.prop('getUrl')).toBe('fooUrl');
  });

  it('should inject onChange', () => {
    const onChange = select.prop('onChange') as Function;
    onChange('Bar');
    expect(setFieldValue).toBeCalledWith('fieldName', 'Bar');
  });

  it('should inject queryFormat', () => {
    expect(select.prop('queryFormat')).toBe('mongodb');
  });

  it('should inject placeholder', () => {
    expect(select.prop('placeholder')).toBe('fooPlaceholder');
  });

  it('should inject ["name"] searchFields by default', () => {
    expect(select.prop('searchFields')).toStrictEqual(['name']);
  });

  it('should inject ["foo"] if searchFields is given', () => {
    const w = shallow(
      <AsyncSelectFormikWrapper
        getUrl="fooUrl"
        field={{ value: 'bar', name: 'fieldName' }}
        queryFormat="mongodb"
        form={{ setFieldValue } as any}
        placeholder="fooPlaceholder"
        searchFields={['foo']}
      />
    );
    const s = w.find('AsyncSelect');
    expect(s.prop('searchFields')).toStrictEqual(['foo']);
  });
});
