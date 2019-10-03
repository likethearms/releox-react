import React from 'react';
import { shallow } from 'enzyme';
import { DataTable } from './DataTable';

describe('DataTable', () => {
  it('should setup some options by default to component', () => {
    const wrapper = shallow(
      <DataTable
        data={[{ id: 1 }]}
        columns={[]}
        totalSize={20}
        defaultSorted={{ dataField: '', order: 'ASC' }}
      />
    );
    expect(wrapper.prop('bootstrap4')).toBe(true);
    expect(wrapper.prop('remote')).toBe(true);
    expect(wrapper.prop('classes')).toBe('table-responsive-sm');
    expect(wrapper.prop('keyField')).toBe('id');
    expect(wrapper.prop('hover')).toBe(true);
    expect(wrapper.prop('bordered')).toBe(false);
    expect(wrapper.prop('striped')).toBe(true);
    expect(wrapper.prop('loading')).toBe(false);
  });

  it('should show default noDataText', () => {
    const wrapper = shallow(
      <DataTable
        data={[{ id: 1 }]}
        columns={[]}
        totalSize={20}
        defaultSorted={{ dataField: '', order: 'ASC' }}
      />
    );
    expect(wrapper.prop('noDataIndication')()).toStrictEqual(
      <p style={{ margin: 0, textAlign: 'center' }}>Ei näytettäviä tietoja</p>
    );
  });

  it('should show noDataText', () => {
    const wrapper = shallow(
      <DataTable
        data={[{ id: 1 }]}
        columns={[]}
        noDataText="Foo Bar"
        totalSize={20}
        defaultSorted={{ dataField: '', order: 'ASC' }}
      />
    );
    expect(wrapper.prop('noDataIndication')()).toStrictEqual(
      <p style={{ margin: 0, textAlign: 'center' }}>Foo Bar</p>
    );
  });

  it('should call onChangeLoopback', () => {
    const object = {
      sortField: 'name',
      sortOrder: 'DESC',
      sizePerPage: 20,
      page: 1,
    };
    const spy = jest.fn();
    const wrapper = shallow(
      <DataTable
        data={[{ id: 1 }]}
        columns={[]}
        onChangeLoopback={spy}
        totalSize={20}
        defaultSorted={{ dataField: 'id', order: 'ASC' }}
      />
    );
    wrapper.prop('onTableChange')('', object);
    expect(spy.mock.calls).toEqual([
      [{ limit: 20, order: 'id ASC', skip: 0 }],
      [{ limit: 20, order: 'name DESC', skip: 0 }],
    ]);
  });

  it('should call onClick', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <DataTable
        data={[{ id: 1 }]}
        columns={[]}
        onClick={spy}
        totalSize={20}
        defaultSorted={{ dataField: 'id', order: 'ASC' }}
      />
    );
    wrapper.prop('rowEvents').onClick();
    expect(wrapper.prop('rowClasses')).toBe('BootstrapTable-hover');
    expect(spy).toBeCalledTimes(1);
  });

  it('should combine all row classes', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <DataTable
        data={[{ id: 1 }]}
        columns={[]}
        onClick={spy}
        rowClasses="foo"
        totalSize={20}
        defaultSorted={{ dataField: 'id', order: 'ASC' }}
      />
    );
    expect(wrapper.prop('rowClasses')).toBe('foo BootstrapTable-hover');
  });
});
