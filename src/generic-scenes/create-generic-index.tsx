import React from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Card } from '../components/Card/Card';
import {
  DataTableLoopbackFilter,
  DataTableColumn,
  DataTableDefaultSort,
  DataTable,
} from '../components/DataTable/DataTable';
import { CardTitle } from '../components/CardTitle/CardTitle';

interface IndexSceneProps {
  title: string;
  createLink?: string;
  totalSize: number;
  onClick?(_: string, row: any): void;
  onChangeLoopback(): void;
  columns: DataTableColumn[];
  loading: boolean;
  defaultSorted?: DataTableDefaultSort;
  data: any[];
  query: any;
}

const IndexScene = (props: IndexSceneProps): JSX.Element => {
  const {
    totalSize,
    onClick,
    onChangeLoopback,
    createLink,
    title,
    columns,
    defaultSorted,
    data,
    query,
    loading,
  } = props;
  let addLink = <span />;
  if (createLink) {
    addLink = (
      <Link className="btn btn-primary float-right" to={createLink}>
        Add new
      </Link>
    );
  }

  return (
    <Card>
      {addLink}
      <CardTitle lg>{title}</CardTitle>
      <DataTable
        data={data}
        totalSize={totalSize}
        keyField="id"
        onChangeLoopback={onChangeLoopback}
        loading={loading}
        onClick={onClick}
        columns={columns}
        defaultSorted={defaultSorted || { dataField: 'id', order: 'asc' }}
        query={query}
      />
    </Card>
  );
};

interface WrapperProps {
  data: any[];
  count: number;
  fetch: any;
  loading: boolean;
  onRowClick?(_: string, row: any): void;
}

const getWrappedIndexScene = (title: string, passProps: DataTableProps, createLink?: string) => (
  props: WrapperProps
): JSX.Element => {
  const { data, count, fetch, onRowClick, loading } = props;

  return (
    <IndexScene
      columns={passProps.columns}
      data={data}
      onClick={onRowClick}
      defaultSorted={passProps.defaultSorted}
      loading={loading}
      totalSize={count}
      query={passProps.query}
      onChangeLoopback={fetch}
      createLink={createLink}
      title={title}
    />
  );
};

interface DataTableProps {
  query?: any;
  columns: DataTableColumn[];
  defaultSorted?: DataTableDefaultSort;
}

export default (
  title: string,
  reduxEntry: string,
  listAction: Function,
  dataTableProps: DataTableProps,
  redirectUrl?: string,
  createLink?: string
) => {
  const mapStateToProps = (state: any) => ({
    data: state[reduxEntry].list.data,
    count: state[reduxEntry].list.count,
    loading: state[reduxEntry].list.isFetchLoading || state[reduxEntry].list.isCountLoading,
  });

  const mapDispatchToProps = (dispatch: Function) => {
    const obj: any = { fetch: (filter: DataTableLoopbackFilter) => dispatch(listAction(filter)) };
    if (redirectUrl) {
      obj.onRowClick = (_: string, row: any) =>
        dispatch(push(redirectUrl.replace(':id', `${row.id}`)));
    }
    return obj;
  };

  const Component = getWrappedIndexScene(title, dataTableProps, createLink);
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
};
