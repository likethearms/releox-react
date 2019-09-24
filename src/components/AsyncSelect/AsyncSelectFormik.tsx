import React from 'react';
import { Field, FieldProps } from 'formik';
import { AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';
import { AsyncSelectQueryFormat, AsyncSelect } from './AsyncSelect';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';

export interface AsyncSelectFormikProps extends AbstractInputGroupProps {
  getUrl: string;
  queryFormat: AsyncSelectQueryFormat;
  mapLabel?: string;
  mapValue?: string;
  searchFields?: string[];

  onError?(e: Error): any;
  placeholder?: string;
  value?: string;
}

export class AsyncSelectFormik extends AbstractFormikInputGroup<AsyncSelectFormikProps> {
  getInputElement(fieldProps: FieldProps) {
    const { getUrl, queryFormat, mapLabel, searchFields, mapValue, placeholder, id } = this.props;
    return (
      <div className="ReactSelectHelper">
        <AsyncSelect
          {...fieldProps.field} // eslint-disable-line
          getUrl={getUrl}
          id={id}
          className={this.getInvalidClass(fieldProps)}
          queryFormat={queryFormat}
          mapLabel={mapLabel}
          mapValue={mapValue}
          onChange={(value: string) => fieldProps.form.setFieldValue(fieldProps.field.name, value)}
          placeholder={placeholder}
          searchFields={searchFields || ['name']}
        />
        {this.getErrorMessageField()}
      </div>
    );
  }

  getElement(name: string): JSX.Element {
    this.getInputElement = this.getInputElement.bind(this);
    return <Field name={name} component={this.getInputElement} />;
  }
}
