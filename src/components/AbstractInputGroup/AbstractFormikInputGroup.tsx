/*
 * This component should be use to make Formik inputs for Releox framework. This class extends
 * AbstractInputGroup and add all default behavior to all inputs. It adds 2 extra methods
 * to which helps to make input validation easy.
 */
import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import getValue from 'get-value';
import { AbstractInputGroup } from './AbstractInputGroup';

export abstract class AbstractFormikInputGroup<T> extends AbstractInputGroup<T> {
  getInvalidClass({ field, form: { touched, errors } }: FieldProps) {
    return getValue(errors, field.name) && getValue(touched, field.name) ? 'is-invalid' : '';
  }

  getErrorMessageField() {
    const { name } = this.props;
    return (
      <div className="invalid-feedback">
        <ErrorMessage name={name} />
      </div>
    );
  }
}
