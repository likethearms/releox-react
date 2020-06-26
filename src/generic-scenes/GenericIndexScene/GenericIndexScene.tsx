import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Card } from '../../components/Card/Card';
import { CardTitle } from '../../components/CardTitle/CardTitle';
import {
  DataTable,
  DataTableColumn,
  DataTableDefaultSort,
} from '../../components/DataTable/DataTable';

export interface GenericIndexProps {
  loadingSelector(state: any): boolean;
  dataSelector(state: any): any;
  dataSizeSelector(state: any): number;
  onChangeLoopback(): void;
  columns: DataTableColumn[];

  createLink?: string;
  onClick?(event: string, row: any): void;
  redirectUrl?: string;
  context?: string;
  defaultSorted?: DataTableDefaultSort;
  query?: any;
}

export const GenericIndexScene = (props: GenericIndexProps) => {
  const {
    createLink,
    context,
    columns,
    defaultSorted,
    query,
    redirectUrl,
    onClick,
    loadingSelector,
    dataSelector,
    dataSizeSelector,
    onChangeLoopback,
  } = props;

  const isLoading = useSelector(loadingSelector);
  const dataSize = useSelector(dataSizeSelector);
  const data = useSelector(dataSelector);

  const dispatch = useDispatch();

  const { t } = useTranslation(context || 'DataTable');

  let addLink = <span />;
  if (createLink) {
    addLink = (
      <Link className="btn btn-primary float-right" to={createLink}>
        {t('addNew')}
      </Link>
    );
  }

  let handleClick = onClick;

  if (redirectUrl) {
    handleClick = useCallback(
      (_: string, row: any) => {
        dispatch(push(redirectUrl.replace(':id', `${row.id}`)));
      },
      [redirectUrl, dispatch]
    );
  }

  return (
    <Card>
      {addLink}
      <CardTitle lg>{t('title')}</CardTitle>
      <DataTable
        data={data}
        totalSize={dataSize}
        keyField="id"
        onChangeLoopback={onChangeLoopback}
        loading={isLoading}
        onClick={handleClick}
        columns={columns}
        defaultSorted={defaultSorted || { dataField: 'id', order: 'asc' }}
        query={query}
      />
    </Card>
  );
};
