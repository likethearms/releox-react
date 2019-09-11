import React from 'react';
import { Field } from 'formik';
import { AsyncSelectFormikWrapper } from './AsyncSelectFormikWrapper';
import { AbstractInputGroup, AbstractInputGroupProps } from '../AbstractInputGroup/AbstractInputGroup';
import { AsyncSelectQueryFormat } from './AsyncSelect';

export interface AsyncSelectFormikProps extends AbstractInputGroupProps {
  getUrl: string;
  queryFormat: AsyncSelectQueryFormat;
}

export class AsyncSelectFormik extends AbstractInputGroup<AsyncSelectFormikProps> {
  getElement(name: string, id: string): JSX.Element {
    const { getUrl, queryFormat } = this.props;
    return (
      <Field
        name={name}
        id={id}
        getUrl={getUrl}
        queryFormat={queryFormat}
        component={AsyncSelectFormikWrapper}
      />
    );
  }
}
