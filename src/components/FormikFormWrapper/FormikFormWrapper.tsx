import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { FormikFormWrapperProps } from '../../typings';

const FormikFormWrapper = <R extends {}>(props: FormikFormWrapperProps<R>): JSX.Element => {
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

FormikFormWrapper.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default FormikFormWrapper;
