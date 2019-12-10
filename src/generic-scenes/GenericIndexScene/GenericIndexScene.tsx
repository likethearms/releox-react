import React from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Card } from '../../components/Card/Card';
import {
  DataTableLoopbackFilter,
  DataTableColumn,
  DataTableDefaultSort,
  DataTable,
} from '../../components/DataTable/DataTable';
import { CardTitle } from '../../components/CardTitle/CardTitle';

interface IndexSceneProps {
  title?: string;
  createLink?: string;
  totalSize: number;
  onClick?(_: string, row: any): void;
  onChangeLoopback(): void;
  columns: DataTableColumn[];
  context?: string;
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
    context,
    data,
    query,
    loading,
  } = props;
  let addLink = <span />;
  const { t } = useTranslation(context || 'GenericIndexScene');
  if (createLink) {
    addLink = (
      <Link className="btn btn-primary float-right" to={createLink}>
        {t('addNew')}
      </Link>
    );
  }

  return (
    <Card>
      {addLink}
      <CardTitle lg>{title || t('title')}</CardTitle>
      <DataTable
        data={data}
        totalSize={totalSize}
        context={context}
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

export interface GenericIndexProps {
  data: any[];
  count: number;
  user: any;
  fetch: any;
  loading: boolean;
  dataTableProps: DataTableProps;
  onRowClick?(_: string, row: any): void;
  title?: string;
  context?: string;
  createLink?: string;
}

const WrappedGenericIndex = (props: GenericIndexProps): JSX.Element => {
  const {
    data,
    count,
    fetch,
    onRowClick,
    loading,
    user,
    dataTableProps,
    context,
    createLink,
    title,
  } = props;

  let query;

  if (typeof dataTableProps.query === 'object') query = dataTableProps.query;
  else if (typeof dataTableProps.query === 'object') query = dataTableProps.query({ user });

  return (
    <IndexScene
      columns={dataTableProps.columns}
      data={data}
      onClick={onRowClick}
      defaultSorted={dataTableProps.defaultSorted}
      loading={loading}
      context={context}
      totalSize={count}
      query={query}
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

interface GenericIndexDispatchedProps {
  reduxEntry: string;
  mapUser?: boolean;
  listAction: Function;
  redirectUrl?: string;
}

const mapDispatchToProps = (
  dispatch: Function,
  { redirectUrl, listAction }: GenericIndexDispatchedProps
) => {
  const obj: { onRowClick?: any; fetch: any } = {
    fetch: (filter: DataTableLoopbackFilter) => dispatch(listAction(filter)),
  };
  if (redirectUrl) {
    obj.onRowClick = (_: string, row: any) =>
      dispatch(push(redirectUrl.replace(':id', `${row.id}`)));
  }
  return obj;
};

const mapStateToProps = (state: any, { reduxEntry, mapUser }: GenericIndexDispatchedProps) => {
  const map = {
    data: state[reduxEntry].list.data as any[],
    count: state[reduxEntry].list.count as number,
    user: undefined,
    loading: state[reduxEntry].list.isFetchLoading || state[reduxEntry].list.isCountLoading,
  };

  if (mapUser) map.user = state.user.model.data;

  return map;
};

export const GenericIndexScene = connect(mapStateToProps, mapDispatchToProps)(WrappedGenericIndex);
