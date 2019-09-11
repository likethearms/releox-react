import React from 'react';
import { FormikValues } from 'formik';
import { AsyncSelectQueryFormat, AsyncSelect } from './AsyncSelect';
import { AbstractFormikInputWrapper } from '../AbstractFormikInputWrapper/AbstractFormikInputWrapper';

export interface AsyncSelectFormikWrapperProps {
  field: FormikValues;
  queryFormat: AsyncSelectQueryFormat;
  getUrl: string;
  placeholder?: string;
  searchFields: string[];
  form: { setFieldValue: Function };
}

export interface AsyncSelectWrapperDefaultProps {
  searchFields: string[];
}

export class AsyncSelectFormikWrapper
  extends AbstractFormikInputWrapper<string, AsyncSelectFormikWrapperProps> {
  public static defaultProps: AsyncSelectWrapperDefaultProps = {
    searchFields: ['name'],
  };

  constructor(props: AsyncSelectFormikWrapperProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render(): JSX.Element {
    const {
      field, getUrl, searchFields, placeholder, queryFormat,
    } = this.props;
    return (
      <AsyncSelect
        value={field.value}
        getUrl={getUrl}
        queryFormat={queryFormat}
        onChange={this.onChange}
        placeholder={placeholder}
        searchFields={searchFields}
      />
    );
  }
}
