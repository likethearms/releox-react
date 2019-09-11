import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AsyncSelectFormik } from './AsyncSelectFormik';

describe('AsyncSelectFormik', () => {
  let wrapper: ShallowWrapper;
  let input: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow((
      <AsyncSelectFormik
        label="selectLabel"
        getUrl="url"
        queryFormat="mongodb"
        name="selectName"
        id="selectBox"
      />
    ));
    input = wrapper.find('#selectBox');
  });


  it('should have name to be specific', () => {
    expect(input.prop('name')).toBe('selectName');
  });

  it('should have label to be specific', () => {
    expect(wrapper.find('label').text()).toBe('selectLabel');
  });

  it('should have queryFormat to be specific', () => {
    expect(input.prop('queryFormat')).toBe('mongodb');
  });

  it('should have getUrl to be specific', () => {
    expect(input.prop('getUrl')).toBe('url');
  });
});
