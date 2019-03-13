import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

interface FormikFormWrapperProps<R> {
  onSubmit(data: R): void;
  initialValues: R;
  children: JSX.Element;
}

const FormikFormWrapper = function <R>(props: FormikFormWrapperProps<R>): JSX.Element {
  const { onSubmit, initialValues, children } = props;
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {children}
        </form >
      )}
    </Formik>
  );
};

FormikFormWrapper.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormikFormWrapper;
