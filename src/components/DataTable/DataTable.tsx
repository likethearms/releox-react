import React, { ReactElement, useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useTranslation } from 'react-i18next';
import overlayElementFunction from './overlayElementFunction';

export interface DataTableColumn {
  dataField: string;
  text: string;
  headerClasses?: string;
  formatter?(
    cell: any,
    row: any,
    rowIndex: number,
    formatExtraData: any
  ): ReactElement | string | number;
  sort?: boolean;
}

export interface DataTableDefaultSort {
  dataField: string;
  order: string;
}

export interface DataTableProps {
  keyField: string;
  hover?: boolean;
  context?: string;
  striped?: boolean;
  totalSize: number;
  initialSizePerPage?: number;
  noDataText?: string;
  overlayElement?: () => JSX.Element;
  loading?: boolean;
  bordered?: boolean;
  onClick?(event: string, row: any): void;
  data: any[];
  columns: DataTableColumn[];
  rowClasses?: string;
  defaultSorted: DataTableDefaultSort;
  onChangeLoopback?(config: DataTableLoopbackFilter): void;
  query?: any;
}

interface TableChangeObject {
  sortField: string;
  sortOrder: string;
  sizePerPage: number;
  page: number;
}

export interface DataTableLoopbackFilter {
  where?: any;
  order?: string;
  include?: string | string[];
  limit?: number;
  skip?: number;
}

export const DataTable = ({
  initialSizePerPage,
  rowClasses,
  keyField,
  hover,
  bordered,
  striped,
  data,
  columns,
  onClick,
  totalSize,
  loading,
  defaultSorted,
  onChangeLoopback,
  overlayElement,
  query,
  context,
  noDataText,
}: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);

  const { t } = useTranslation(context || 'DataTable');

  const onTableChange = (_: string, object: TableChangeObject): void => {
    if (onChangeLoopback) {
      let field = defaultSorted.dataField;
      let { order } = defaultSorted;
      if (object.sortField && object.sortOrder) {
        field = object.sortField;
        order = object.sortOrder;
      }
      onChangeLoopback({
        ...query,
        order: `${field} ${order}`,
        limit: object.sizePerPage,
        skip: (object.page - 1) * object.sizePerPage,
      });
    }
    setSizePerPage(object.sizePerPage);
    setPage(object.page);
  };

  useEffect(() => {
    setSizePerPage(initialSizePerPage || 20);
    const object = {
      page,
      sizePerPage,
      sortField: '',
      sortOrder: '',
    };
    onTableChange('componentDidMount', object);
    // eslint-disable-next-line
  }, [initialSizePerPage]);

  const getCombinedRowClasses = (): string[] => {
    const combinedRowClasses = [];
    if (rowClasses) combinedRowClasses.push(rowClasses);
    if (onClick) combinedRowClasses.push('BootstrapTable-hover');
    return combinedRowClasses;
  };

  let rowEvents;
  const combinedRowClasses = getCombinedRowClasses();
  if (onClick) rowEvents = { onClick };
  return (
    <BootstrapTable
      bootstrap4
      remote
      classes="table-responsive-sm"
      keyField={keyField || 'id'}
      hover={hover || true}
      bordered={bordered || false}
      striped={striped || true}
      onTableChange={onTableChange}
      noDataIndication={() => (
        <p style={{ textAlign: 'center', margin: 0 }}>{noDataText || t('noDataText')}</p>
      )}
      loading={loading || false}
      overlay={overlayElementFunction({
        overlayElement,
        loadingText: t('loadingText'),
      })}
      rowClasses={combinedRowClasses.join(' ')}
      data={data}
      rowEvents={rowEvents}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      columns={columns}
    />
  );
};
