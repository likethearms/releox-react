import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export interface FormikFormWrapperProps<R> {
  onSubmit(data: R): void;
  initialValues: R;
  children: JSX.Element;
}

const FormikFormWrapperComponent = <R extends {}>(
  props: FormikFormWrapperProps<R>,
): JSX.Element => {
  const { onSubmit, initialValues, children } = props;
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {children}
        </form>
      )}
    </Formik>
  );
};

FormikFormWrapperComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export const FormikFormWrapper = FormikFormWrapperComponent;
