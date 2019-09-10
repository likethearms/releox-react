import React from 'react';
import moxios from 'moxios';
import { mount, ReactWrapper } from 'enzyme';
import { AsyncSelect } from './AsyncSelect';

let wrapper: ReactWrapper<{}, {}, AsyncSelect>;

describe('AsyncSelect', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(/./, {
      status: 200,
      response: [
        {
          id: 1,
          name: 'Foo',
        },
        {
          id: 2,
          name: 'Bar',
        },
      ],
    });

    wrapper = mount((
      <AsyncSelect
        onChange={() => { }}
        onError={() => { }}
        getUrl="/Products/"
        searchFields={['name', 'bar']}
        queryFormat="postgresql"
        value="1"
      />
    ));
  });

  afterEach(() => {
    moxios.uninstall();
  });

  xit('should set default value', () => {
    expect(wrapper.state('defaultValue')).toStrictEqual({ value: 1, label: 'Foo' });
  });

  xit('should have right postgresql query', () => {
    expect(wrapper.instance().buildQuery('1')).toStrictEqual({ name: { ilike: '%1%' } });
  });

  xit('should have right mongodb query', () => {
    wrapper = mount((
      <AsyncSelect
        onChange={() => { }}
        getUrl="/Products/"
        searchFields={['name', 'bar']}
        queryFormat="mongodb"
      />
    ));

    expect(wrapper.instance().buildQuery('1')).toStrictEqual({ name: { like: '1', options: 'i' } });
  });

  it('should match children', () => {
    wrapper = mount((
      <AsyncSelect
        onChange={() => { }}
        getUrl="/Products/"
        searchFields={['name', 'bar']}
        queryFormat="mongodb"
      />
    ));
  });
});
