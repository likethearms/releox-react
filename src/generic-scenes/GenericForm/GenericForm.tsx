import { Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { ObjectSchema } from 'yup';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { CardTitle } from '../../components/CardTitle/CardTitle';
import { Loading } from '../../components/Loading/Loading';

export interface GenericFormPropsBase {
  tNamespace: string;
  initialValues: any;
  rowClassName?: string;
  colClassName?: string;
  validationSchema?: ObjectSchema<any> | (() => ObjectSchema<any>);
  onBack?: string | boolean | Function;
  EmbedForm: React.FunctionComponent;
  loadingSelector(state: any): any;
}

export type GenericId = string | number;

interface GenericFormProps extends GenericFormPropsBase {
  initialValues: any;
  onSubmit(...args: any[]): any;
  recordId?: GenericId;
  onDelete?(id: GenericId): any;
}

export const GenericForm = (props: GenericFormProps) => {
  const {
    initialValues,
    onSubmit,
    validationSchema,
    loadingSelector,
    tNamespace,
    EmbedForm,
    recordId,
    onDelete,
    onBack = true,
    colClassName = 'col-lg-6',
    rowClassName = 'row justify-content-md-center',
  } = props;
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  const { t } = useTranslation([tNamespace, 'GenericForm']);

  const onBackClick = useCallback(() => {
    if (onBack) {
      if (onBack === true) dispatch(goBack());
      if (typeof onBack === 'string') dispatch(push(onBack));
      if (typeof onBack === 'function') onBack();
    }
  }, [dispatch]);

  const onDeleteClick = useCallback(() => {
    if (recordId && onDelete) dispatch(onDelete(recordId));
  }, [dispatch, recordId]);

  const onFormikSubmit = useCallback(
    (data: any) => {
      if (recordId) dispatch(onSubmit(recordId, data));
      else dispatch(onSubmit(data));
    },
    [dispatch]
  );

  if (isLoading) return <Loading centeredVertical />;
  return (
    <div className={rowClassName}>
      <div className={colClassName}>
        <Card>
          <CardTitle>{t('title')}</CardTitle>
          <>
            <Formik
              onSubmit={onFormikSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form>
                <EmbedForm />
                {onBack ? (
                  <Button id="GenericForm-back" onClick={onBackClick}>
                    {t(['back', 'GenericForm:back'])}
                  </Button>
                ) : (
                  ''
                )}
                <Button type="submit" id="GenericFormScene-submit" className="float-right">
                  {t(['save', 'GenericForm:save'])}
                </Button>
              </Form>
            </Formik>
            {onDelete ? (
              <>
                <hr />
                <Button id="delete-button" color="danger" onClick={onDeleteClick}>
                  {t(['delete', 'GenericForm:delete'])}
                </Button>
              </>
            ) : (
              ''
            )}
          </>
        </Card>
      </div>
    </div>
  );
};
