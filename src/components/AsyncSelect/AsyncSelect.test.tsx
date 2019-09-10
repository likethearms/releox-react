import React from 'react';
import moxios from 'moxios';
import { mount, ReactWrapper } from 'enzyme';
import { AsyncSelect } from './AsyncSelect';

let wrapper: ReactWrapper<{}, {}, AsyncSelect>;

describe('AsyncSelect', () => {
  describe('Async props', () => {
    xit('should inject undefined default values if non is passed', () => { });
    xit('should fetch and inject given default values to Async', () => { });
    xit('should call onChange with empty string if value is null', () => { });
    xit('should call onChange with given value if value object passed', () => { });
    xit('should inject placeholder', () => { });
    xtest('loadOptions return promise', () => { });
    xtest('loadOptions return build mongodb query', () => { });
    xtest('loadOptions return build postgres query', () => { });
    xtest('loadOptions call onError when promise rejects', () => { });
    xit('should turn loading off if no default values passed', () => { });
    xit('should turn loading off if default values is given', () => { });
    xit('should use different mapValue in query if given', () => { });
    xit('should use different mapLabel in query if given', () => { });
  });
});
