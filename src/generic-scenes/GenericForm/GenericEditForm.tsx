import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Loading } from '../../components/Loading/Loading';
import { GenericForm, GenericFormPropsBase, GenericId } from './GenericForm';

interface Props extends GenericFormPropsBase {
  dataSelector(state: any): any;
  onFetch(id: GenericId, requestParams?: any): any;
  onSubmit: GenericFormUpdateSubmit;
  paramKey?: string;
  recordId?: GenericId;
  requestParams?: any;
  onDelete?(id: GenericId): any;
}

type GenericFormUpdateSubmit = (id: GenericId, body: any, options?: { redirect?: string }) => any;

export const GenericEditForm = (props: Props) => {
  const {
    dataSelector,
    loadingSelector,
    paramKey = 'id',
    recordId,
    onSubmit,
    onSubmitOptions,
    onBack,
    onFetch,
    onDelete,
    validationSchema,
    EmbedForm,
    initialValues,
    tNamespace,
    requestParams,
    colClassName,
    rowClassName,
  } = props;
  const dispatch = useDispatch();
  const params = useParams<any>();
  const [isFetched, setIsFetched] = useState(false);
  const data = useSelector(dataSelector);

  const getId = useCallback(() => {
    return recordId || params[paramKey];
  }, [recordId, params, paramKey]);

  useEffect(() => {
    dispatch(onFetch(getId(), requestParams));
    setIsFetched(true);
  }, [onFetch, dispatch, setIsFetched, getId, requestParams]);

  if (!isFetched) return <Loading centeredVertical />;
  return (
    <GenericForm
      initialValues={{ ...initialValues, ...data }}
      loadingSelector={loadingSelector}
      onBack={onBack}
      EmbedForm={EmbedForm}
      rowClassName={rowClassName}
      colClassName={colClassName}
      onSubmit={onSubmit}
      onSubmitOptions={onSubmitOptions}
      onDelete={onDelete}
      recordId={getId()}
      validationSchema={validationSchema}
      tNamespace={tNamespace}
    />
  );
};
