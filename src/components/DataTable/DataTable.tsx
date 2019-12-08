import React, { Component, ReactElement } from 'react';
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
  hover: boolean;
  striped: boolean;
  totalSize: number;
  initialSizePerPage?: number;
  noDataText: string;
  overlayElement?: () => JSX.Element;
  loading: boolean;
  bordered: boolean;
  onClick?(event: string, row: any): void;
  data: any[];
  columns: DataTableColumn[];
  rowClasses?: string;
  defaultSorted: DataTableDefaultSort;
  onChangeLoopback?(config: DataTableLoopbackFilter): void;
  query?: any;
}

interface State {
  page: number;
  sizePerPage: number;
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

interface DefaultProps {
  keyField: string;
  hover: boolean;
  loading: boolean;
  noDataText: string;
  striped: boolean;
  onClick: undefined;
  bordered: boolean;
}

export class DataTable extends Component<DataTableProps, State> {
  static defaultProps: DefaultProps = {
    keyField: 'id',
    hover: true,
    striped: true,
    onClick: undefined,
    loading: false,
    noDataText: '',
    bordered: false,
  };

  constructor(props: DataTableProps) {
    super(props);
    this.state = {
      page: 1,
      sizePerPage: props.initialSizePerPage || 20,
    };
    this.onTableChange = this.onTableChange.bind(this);
  }

  componentDidMount(): void {
    const { sizePerPage, page } = this.state;
    const object = {
      page,
      sizePerPage,
      sortField: '',
      sortOrder: '',
    };
    this.onTableChange('componentDidMount', object);
  }

  onTableChange(_: string, object: TableChangeObject): void {
    const { onChangeLoopback, query, defaultSorted } = this.props;
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
    this.setState({ ...object });
  }

  getCombinedRowClasses(): string[] {
    const { rowClasses, onClick } = this.props;
    const combinedRowClasses = [];
    if (rowClasses) combinedRowClasses.push(rowClasses);
    if (onClick) combinedRowClasses.push('BootstrapTable-hover');
    return combinedRowClasses;
  }

  render(): JSX.Element {
    const {
      keyField,
      hover,
      bordered,
      striped,
      data,
      columns,
      onClick,
      totalSize,
      loading,
      overlayElement,
      noDataText,
    } = this.props;
    let rowEvents;
    const { page, sizePerPage } = this.state;
    const combinedRowClasses = this.getCombinedRowClasses();
    const { t } = useTranslation('dataTable');
    if (onClick) rowEvents = { onClick };
    return (
      <BootstrapTable
        bootstrap4
        remote
        classes="table-responsive-sm"
        keyField={keyField}
        hover={hover}
        bordered={bordered}
        striped={striped}
        onTableChange={this.onTableChange}
        noDataIndication={() => (
          <p style={{ textAlign: 'center', margin: 0 }}>{noDataText || t('noDataText')}</p>
        )}
        loading={loading}
        overlay={overlayElementFunction({ overlayElement })}
        rowClasses={combinedRowClasses.join(' ')}
        data={data}
        rowEvents={rowEvents}
        pagination={paginationFactory({ page, sizePerPage, totalSize })}
        columns={columns}
      />
    );
  }
}
