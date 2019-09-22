import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AsyncSelectFormik } from './AsyncSelectFormik';

describe('AsyncSelectFormik', () => {
  let wrapper: ShallowWrapper<any, any, AsyncSelectFormik>;
  let input: ShallowWrapper;
  const spy = jest.fn();
  beforeAll(() => {
    wrapper = shallow(
      <AsyncSelectFormik
        label="selectLabel"
        getUrl="url"
        queryFormat="mongodb"
        name="selectName"
        id="selectBox"
      />
    );
    const formProps = {
      field: { name: 'selectName' },
      form: { setFieldValue: spy },
      errors: {},
    } as any;
    const w = shallow(wrapper.instance().getInputElement(formProps));
    input = w.find('AsyncSelect');
  });

  it('should have name to be specific', () => {
    expect(wrapper.find('[name="selectName"]')).toHaveLength(1);
  });

  it('should have label to be specific', () => {
    expect(wrapper.find('label').text()).toBe('selectLabel');
  });

  it('should call', () => {
    const onChange = input.prop('onChange') as Function;
    onChange('foo');
    expect(spy).toBeCalledWith('selectName', 'foo');
  });

  it('should have queryFormat to be specific', () => {
    expect(input.prop('queryFormat')).toBe('mongodb');
  });

  it('should have getUrl to be specific', () => {
    expect(input.prop('getUrl')).toBe('url');
  });
});
