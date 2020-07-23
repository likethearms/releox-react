import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { ObjectSchema } from 'yup';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { CardTitle } from '../../components/CardTitle/CardTitle';
import { Loading } from '../../components/Loading/Loading';

interface FormProps {
  formikProps: FormikProps<any>;
}

export interface GenericFormPropsBase {
  tNamespace: string;
  initialValues: any;
  rowClassName?: string;
  colClassName?: string;
  onSubmitOptions?: { redirect?: string };
  validationSchema?: ObjectSchema<any> | (() => ObjectSchema<any>);
  onBack?: string | boolean | Function;
  EmbedForm: React.FunctionComponent<FormProps> | ((props: FormProps) => JSX.Element);
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
    onSubmitOptions,
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
      else if (typeof onBack === 'string') dispatch(push(onBack));
      else if (typeof onBack === 'function') onBack();
    }
  }, [dispatch, onBack]);

  const onDeleteClick = useCallback(() => {
    if (recordId && onDelete) dispatch(onDelete(recordId));
  }, [dispatch, recordId]);

  const onFormikSubmit = useCallback(
    (data: any) => {
      if (recordId) dispatch(onSubmit(recordId, data, onSubmitOptions));
      else dispatch(onSubmit(data, onSubmitOptions));
    },
    [dispatch, onSubmitOptions, onSubmit, recordId]
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
              {(formikProps: FormikProps<any>) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <EmbedForm formikProps={formikProps} />
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
                </form>
              )}
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
