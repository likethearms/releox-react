import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
    onClick,
    loadingSelector,
    dataSelector,
    dataSizeSelector,
    onChangeLoopback,
  } = props;

  const isLoading = useSelector(loadingSelector);
  const dataSize = useSelector(dataSizeSelector);
  const data = useSelector(dataSelector);

  const { t } = useTranslation(context || 'DataTable');

  let addLink = <span />;
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
      <CardTitle lg>{t('title')}</CardTitle>
      <DataTable
        data={data}
        totalSize={dataSize}
        keyField="id"
        onChangeLoopback={onChangeLoopback}
        loading={isLoading}
        onClick={onClick}
        columns={columns}
        defaultSorted={defaultSorted || { dataField: 'id', order: 'asc' }}
        query={query}
      />
    </Card>
  );
};
