import { Formik, Form } from 'formik';
import React, { ElementType, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from '../../config';
import { Loading } from '../../components/Loading/Loading';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Button } from '../../components/Button/Button';
import { patchUserRequest } from '../../requests';

/* eslint-disable react/jsx-props-no-spreading */

interface Props {
  authenticatedUser: any;
}

const CONTEXT = 'validateModel';

export const validateModel = (fields: string[], FormComponent: ElementType) => (
  WrapperElement: any
) => (props: Props) => {
  const { authenticatedUser } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');

  const { t } = useTranslation('validateModel');

  const validateUserModel = (userModel: any) => {
    let valid = true;
    fields.forEach((field) => {
      if (!userModel[field]) valid = false;
    });
    return valid;
  };

  useEffect(() => {
    setIsValid(validateUserModel(authenticatedUser));
    setIsLoading(false);
  }, [authenticatedUser]);

  const onSubmit = (body: any) => {
    return patchUserRequest(authenticatedUser.id, body)
      .then(() => window.location.reload())
      .catch((error) => setMessage(getErrorMessage(error)));
  };

  if (isLoading) return <Loading centeredVertical />;
  if (!isValid) {
    return (
      <AuthLayout context={CONTEXT} message={message} links={[]}>
        <Formik onSubmit={onSubmit} initialValues={authenticatedUser}>
          {() => (
            <Form>
              <FormComponent />
              <Button type="submit" id="submit" className="float-right">
                {t('button')}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    );
  }
  return <WrapperElement {...props} />;
};
