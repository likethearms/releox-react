import React from 'react';
import AbstractFormikInputWrapper from '../AbstractFormikInputWrapper/AbstractFormikInputWrapper';
import AsyncSelect from './AsyncSelect';
import { AsyncSelectFormikWrapperProps, AsyncSelectWrapperDefaultProps } from '../../typings';

class AsyncSelectFormikWrapper
  extends AbstractFormikInputWrapper<string, AsyncSelectFormikWrapperProps> {
  public static defaultProps: AsyncSelectWrapperDefaultProps = {
    searchFields: ['name'],
  };

  render(): JSX.Element {
    const { field, getUrl, searchFields, placeholder, queryFormat } = this.props;
    return (
      <AsyncSelect
        value={field.value}
        getUrl={getUrl}
        queryFormat={queryFormat}
        onChange={this.onChange.bind(this)}
        placeholder={placeholder}
        searchFields={searchFields}
      />
    );
  }
}

export default AsyncSelectFormikWrapper;
