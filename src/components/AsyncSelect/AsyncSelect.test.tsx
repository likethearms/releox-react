import React from 'react';
import moxios from 'moxios';
import { createWaitForElement } from 'enzyme-wait';
import { shallow, ShallowWrapper } from 'enzyme';
import { AsyncSelect } from './AsyncSelect';

describe('AsyncSelect', () => {
  let wrapper: ShallowWrapper<{}, {}, AsyncSelect>;
  const url1 = 'url?filter=%7B%22where%22:%7B%22id%22:%221%22%7D%7D';
  const url2 = 'url?filter=%7B%22where%22:%7B%22id%22:%7B%22options%22:%22i%22%7D%7D%7D&limit=10';
  const response1 = [{ id: 1, name: 'Foo' }];
  const response2 = [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }];

  describe('Async props', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should inject undefined default values if non is passed', () => {
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
        />
      );
      const async = wrapper.find('Async');
      expect(async.prop('defaultValue')).toBe(undefined);
    });

    it('should fetch and inject given default values to Async', async () => {
      moxios.stubRequest(url1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(url2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          mapValue="id"
          value="1"
        />
      );
      await waitForSample(wrapper);
      const async = wrapper.find('Async');
      expect(async.prop('defaultValue')).toStrictEqual({ label: 'Foo', value: 1 });
    });

    it('should inject placeholder', () => {
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          placeholder="Select placeholder"
        />
      );
      const async = wrapper.find('Async');
      expect(async.prop('placeholder')).toBe('Select placeholder');
    });

    it('should call onChange with empty string if value is null', async () => {
      const spy = jest.fn();
      wrapper = shallow(
        <AsyncSelect onChange={spy} getUrl="url" searchFields={['id']} queryFormat="mongodb" />
      );
      const onC = wrapper.find('Async').prop('onChange') as Function;
      onC(null);
      expect(spy).toBeCalledWith('');
    });

    it('should call onChange with given value if value object passed', async () => {
      const spy = jest.fn();
      wrapper = shallow(
        <AsyncSelect onChange={spy} getUrl="url" searchFields={['id']} queryFormat="mongodb" />
      );
      const onC = wrapper.find('Async').prop('onChange') as Function;
      onC({ value: 'Foo' });
      expect(spy).toBeCalledWith('Foo');
    });

    test('loadOptions return promise', async () => {
      moxios.stubRequest(url1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(url2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          mapValue="id"
          value="1"
        />
      );
      await waitForSample(wrapper);
      const onLoad = wrapper.find('Async').prop('loadOptions') as Function;
      expect(onLoad()).resolves.toStrictEqual([
        { label: 'Foo', value: 1 },
        { label: 'Bar', value: 2 },
      ]);
    });

    test('loadOptions call onError when promise rejects', (done) => {
      const spy = jest.fn();
      moxios.stubRequest(url1, {
        status: 400,
        response: { error: { message: 'Error' } },
      });
      moxios.stubRequest(url2, {
        status: 400,
        response: { error: { message: 'Error' } },
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['id']}
          queryFormat="mongodb"
          onError={spy}
        />
      );
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
      moxios.stubRequest(url1, {
        status: 400,
        response: { error: { message: 'Error' } },
      });
      moxios.stubRequest(url2, {
        status: 400,
        response: { error: { message: 'Error' } },
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect onChange={() => {}} getUrl="url" searchFields={['id']} queryFormat="mongodb" />
      );
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
      moxios.stubRequest(url1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(url2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          mapValue="id"
          value="1"
        />
      );
      await waitForSample(wrapper);
      const instance = wrapper.instance();
      expect(instance.state.loading).toBe(false);
    });

    it('should turn loading off if default values is given', async () => {
      moxios.stubRequest(url1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(url2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          mapValue="id"
          value="1"
        />
      );
      await waitForSample(wrapper);
      const instance = wrapper.instance();
      expect(instance.state.loading).toBe(false);
    });

    it('should use different mapValue in query if given', async () => {
      const urlName1 = 'url?filter=%7B%22where%22:%7B%22name%22:%221%22%7D%7D';
      const urlName2 =
        'url?filter=%7B%22where%22:%7B%22name%22:%7B%22options%22:%22i%22%7D%7D%7D&limit=10';
      moxios.stubRequest(urlName1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(urlName2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          mapValue="name"
          value="1"
        />
      );
      await waitForSample(wrapper);
      const async = wrapper.find('Async');
      const onLoad = async.prop('loadOptions') as Function;
      const res = await onLoad();
      expect(async.prop('defaultValue')).toStrictEqual({ label: 'Foo', value: 'Foo' });
      expect(res).toStrictEqual([{ label: 'Foo', value: 'Foo' }, { label: 'Bar', value: 'Bar' }]);
    });

    it('should use different mapLabel in query if given', async () => {
      moxios.stubRequest(url1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(url2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="mongodb"
          mapLabel="id"
          value="1"
        />
      );
      await waitForSample(wrapper);
      const async = wrapper.find('Async');
      expect(async.prop('defaultValue')).toStrictEqual({ label: 1, value: 1 });
    });

    test('loadOptions return build mongodb query', () => {
      expect(wrapper.instance().buildQuery('1')).toStrictEqual({
        name: { like: '1', options: 'i' },
      });
    });

    test('loadOptions return build postgres query', async () => {
      moxios.stubRequest(url1, {
        status: 200,
        response: response1,
      });
      moxios.stubRequest(url2, {
        status: 200,
        response: response2,
      });
      const waitForSample = createWaitForElement('Async');
      wrapper = shallow(
        <AsyncSelect
          onChange={() => {}}
          getUrl="url"
          searchFields={['name']}
          queryFormat="postgresql"
          mapValue="id"
          value="1"
        />
      );
      await waitForSample(wrapper);
      expect(wrapper.instance().buildQuery('1')).toStrictEqual({ name: { ilike: '%1%' } });
    });
  });
});
