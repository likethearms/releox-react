import React from 'react';
import moxios from 'moxios';
import { createWaitForElement } from 'enzyme-wait';
import {
  shallow, ShallowWrapper, mount, ReactWrapper,
} from 'enzyme';
import { AsyncSelect } from './AsyncSelect';


describe('AsyncSelect', () => {
  let wrapper: ShallowWrapper<{}, {}, AsyncSelect>;
  describe('Async props', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should inject undefined default values if non is passed', () => {
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
        />
      ));
      const async = wrapper.find('Async');
      expect(async.prop('defaultValue')).toBe(undefined);
    });

    it('should fetch and inject given default values to Async', async () => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
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
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
          value="1"
        />
      ));
      await waitForSample(wrapper);
      const async = wrapper.find('Async');
      expect(async.prop('defaultValue')).toStrictEqual({ label: 'Foo', value: 1 });
    });

    it('should inject placeholder', () => {
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
          placeholder="Select placeholder"
        />
      ));
      const async = wrapper.find('Async');
      expect(async.prop('placeholder')).toBe('Select placeholder');
    });

    it('should call onChange with empty string if value is null', async () => {
      const spy = jest.fn();
      wrapper = shallow((
        <AsyncSelect
          onChange={spy}
          getUrl="url"
          searchFields={['id', 'name']} // TODO: why 2 values
          queryFormat="mongodb"
        />
      ));
      const onC = wrapper.find('Async').prop('onChange') as Function;
      onC(null);
      expect(spy).toBeCalledWith('');
    });

    it('should call onChange with given value if value object passed', async () => {
      const spy = jest.fn();
      wrapper = shallow((
        <AsyncSelect
          onChange={spy}
          getUrl="url"
          searchFields={['id', 'name']} // TODO: why 2 values
          queryFormat="mongodb"
        />
      ));
      const onC = wrapper.find('Async').prop('onChange') as Function;
      onC({ value: 'Foo' });
      expect(spy).toBeCalledWith('Foo');
    });

    test('loadOptions return promise', async () => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
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
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['id', 'name']} // TODO: why 2 values
          queryFormat="mongodb"
        />
      ));
      await waitForSample(wrapper);
      const onLoad = wrapper.find('Async').prop('loadOptions') as Function;
      expect(onLoad()).resolves.toStrictEqual([{ label: 'Foo', value: 1 }, { label: 'Bar', value: 2 }]);
    });

    test('loadOptions call onError when promise rejects', (done) => {
      const spy = jest.fn();
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
        status: 400,
        response: { error: { message: 'Error' } },
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['id', 'name']} // TODO: why 2 values
          queryFormat="mongodb"
          onError={spy}
        />
      ));
      waitForSample(wrapper)
        .then(() => {
          const onLoad = wrapper.find('Async').prop('loadOptions') as Function;
          return onLoad();
        })
        .catch(() => {
          expect(spy).toBeCalledWith(new Error('Request failed with status code 400'));
          done();
        });
    });


    test('loadOptions call rejects', (done) => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
        status: 400,
        response: { error: { message: 'Error' } },
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['id', 'name']} // TODO: why 2 values
          queryFormat="mongodb"
        />
      ));
      waitForSample(wrapper)
        .then(() => {
          const onLoad = wrapper.find('Async').prop('loadOptions') as Function;
          return onLoad();
        })
        .catch((e: Error) => {
          expect(e).toStrictEqual(new Error('Request failed with status code 400'));
          done();
        });
    });

    it('should turn loading off if no default values passed', async () => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
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
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
        />
      ));
      await waitForSample(wrapper);
      const instance = wrapper.instance();
      expect(instance.state.loading).toBe(false);
    });

    it('should turn loading off if default values is given', async () => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
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
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
          value="1"
        />
      ));
      await waitForSample(wrapper);
      const instance = wrapper.instance();
      expect(instance.state.loading).toBe(false);
    });

    it('should use different mapValue in query if given', async () => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
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
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
          mapValue="name"
          value="1"
        />
      ));
      await waitForSample(wrapper);
      const async = wrapper.find('Async');
      // TODO: invalid test
      expect(async.prop('defaultValue')).toStrictEqual({ label: 'Foo', value: 'Foo' });
    });

    it('should use different mapLabel in query if given', async () => {
      moxios.stubRequest(/./, { // TODO: wildcard need to changed to specify url
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
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow((
        <AsyncSelect
          onChange={() => { }}
          getUrl="url"
          searchFields={['name', 'id']} // TODO: why 2 values
          queryFormat="mongodb"
          mapLabel="id"
          value="1"
        />
      ));
      await waitForSample(wrapper);
      const async = wrapper.find('Async');
      expect(async.prop('defaultValue')).toStrictEqual({ label: 1, value: 1 });
    });
  });
});

describe('Mounted component', () => {
  let wrapper: ReactWrapper<{}, {}, AsyncSelect>;

  beforeAll(() => {
    moxios.install(); // TODO: why moxios if you dont use it
  });

  afterAll(() => {
    moxios.uninstall(); // TODO: why moxios if you dont use it
  });

  test('loadOptions return build postgres query', () => {
    // TODO: tarpeeton mount
    wrapper = mount((
      <AsyncSelect
        onChange={() => { }}
        onError={() => { }}
        getUrl="/Products/"
        searchFields={['name', 'bar']} // TODO: why 2 values
        queryFormat="postgresql"
        value="1"
      />
    ));
    // TODO: Tarpeeton instance() kutsu, testaa Asyncin propsista ja kayta moxiosia tarkistamaan
    expect(wrapper.instance().buildQuery('1')).toStrictEqual({ name: { ilike: '%1%' } });
  });

  test('loadOptions return build mongodb query', () => {
    // TODO: tarpeeton mount
    wrapper = mount((
      <AsyncSelect
        onChange={() => { }}
        onError={() => { }}
        getUrl="/Products/"
        searchFields={['name', 'bar']} // TODO: why 2 values
        queryFormat="mongodb"
        value="1"
      />
    ));
    // TODO: Tarpeeton instance() kutsu, testaa Asyncin propsista ja kayta moxiosia tarkistamaan
    expect(wrapper.instance().buildQuery('1')).toStrictEqual({ name: { like: '1', options: 'i' } });
  });
});
