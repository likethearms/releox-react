import React from 'react';
import { Field } from 'formik';
import AsyncSelectFormikWrapper from './AsyncSelectFormikWrapper';
import AbstractInputGroup from '../AbstractInputGroup/AbstractInputGroup';
import { AsyncSelectFormikProps } from '../../typings';

class AsyncSelectFormik extends AbstractInputGroup<AsyncSelectFormikProps> {
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

export default AsyncSelectFormik;
