import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AsyncSelectFormik } from './AsyncSelectFormik';
import { FormikFormWrapper } from '../FormikFormWrapper/FormikFormWrapper';

describe('AsyncSelectFormik', () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;

  beforeAll(() => {
    wrapper = mount((
      <FormikFormWrapper
        onSubmit={() => { }}
        initialValues={{}}
      >
        <AsyncSelectFormik
          label="selectLabel"
          getUrl="url"
          queryFormat="mongodb"
          name="selectName"
          id="selectBox"
        />
      </FormikFormWrapper>
    ));
    input = wrapper.find('#selectBox');
  });


  it('should have name to be specific', () => {
    expect(input.first().prop('name')).toBe('selectName');
  });

  it('should have label to be specific', () => {
    expect(input.first().prop('label')).toBe('selectLabel');
  });

  it('should have queryFormat to be specific', () => {
    expect(input.first().prop('queryFormat')).toBe('mongodb');
  });

  it('should have getUrl to be specific', () => {
    expect(input.first().prop('getUrl')).toBe('url');
  });
});
