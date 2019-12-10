import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikErrors } from 'formik';
import { goBack } from 'react-router-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { ObjectSchema } from 'yup';
import { connect } from 'react-redux';
import { Card } from '../../components/Card/Card';
import { CardTitle } from '../../components/CardTitle/CardTitle';
import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/Loading/Loading';

interface Props {
  title: string;
  children: JSX.Element;
}

const GenericFormLayout = ({ title, children }: Props) => (
  <div className="row justify-content-md-center">
    <div className="col-lg-6">
      <Card>
        <CardTitle>{title}</CardTitle>
        {children}
      </Card>
    </div>
  </div>
);

export interface FormProps {
  onSubmit(body: any): void;
  initialValues: any;
}

type SaveAction = (body: any) => void;
type SaveCurry = (id?: string) => SaveAction;

type DeleteAction = () => void;
type DeleteCurry = (id: string) => DeleteAction;

type FetchAction = (id: string) => void;

export interface GenericFormSceneProps {
  data: any;
  context?: string;
  title?: string;
  user?: any;
  EmbedForm: any;
  initialValues: any | ((data: any) => any);
  isLoading?: boolean;
  validate?: (values: any) => FormikErrors<any> | Promise<any>;
  validationSchema?: ObjectSchema<any> | (() => ObjectSchema<any>);
  save: SaveCurry;
  valuesFormatter?: (data: any) => any;
  back(): void;
  fetch?: FetchAction;
  del?: DeleteCurry;
}

const WrappedGenericFormScene = (props: GenericFormSceneProps) => {
  const {
    data,
    EmbedForm,
    title,
    isLoading,
    save,
    context,
    del,
    fetch,
    initialValues,
    valuesFormatter,
    back,
    validate,
    validationSchema,
    user,
  } = props;

  const [isFetched, setIsFetched] = useState(false);

  const params = useParams<{ id: string }>();
  const { t } = useTranslation(context || 'GenericFormScene');

  let initValues: any;
  let init;

  if (typeof initialValues === 'object') init = initialValues;
  else init = initialValues({ user, params });

  if (!fetch) initValues = init;
  else initValues = { ...init, ...data };

  if (valuesFormatter) initValues = valuesFormatter(initValues);

  useEffect(() => {
    if (fetch) fetch(params.id);
    setIsFetched(true);
  }, [fetch, setIsFetched, params.id]);

  if (isLoading || !isFetched) return <Loading centeredVertical />;
  return (
    <GenericFormLayout title={title || t('title')}>
      <>
        <Formik
          onSubmit={fetch ? save(params.id) : save()}
          initialValues={initValues}
          validate={validate}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <EmbedForm user={user} initialValues={data} />
              <Button id="GenericFormScene-back" onClick={back}>
                {t('back')}
              </Button>
              <Button type="submit" id="GenericFormScene-submit" className="float-right">
                {t('save')}
              </Button>
            </Form>
          )}
        </Formik>
        {del ? (
          <>
            <hr />
            <Button id="delete-button" color="danger" onClick={del(params.id)}>
              {t('delete')}
            </Button>
          </>
        ) : (
          undefined
        )}
      </>
    </GenericFormLayout>
  );
};

interface GenericIndexDispatchedProps {
  redirectUrl?: string;
  reduxEntry: string;
  mapUser?: boolean;
  saveAction: Function;
  fetchAction?: Function;
  delAction?: Function;
}

interface DispatchOutput {
  save: SaveCurry;
  back(): void;
  fetch?: FetchAction;
  del?: DeleteCurry;
}

const mapDispatchToProps = (
  dispatch: Function,
  { redirectUrl, fetchAction, delAction, saveAction }: GenericIndexDispatchedProps
) => {
  const updateOpts = { redirect: redirectUrl };
  const out: DispatchOutput = {
    back: () => dispatch(goBack()),
    save: (id?: string) => (body: any) => {
      if (id) dispatch(saveAction(id, body, updateOpts));
      else dispatch(saveAction(body, updateOpts));
    },
  };
  if (fetchAction) out.fetch = (id: string) => dispatch(fetchAction(id));
  if (delAction) out.del = (id: string) => () => dispatch(delAction(id));
  return out;
};

const mapStateToProps = (store: any, { reduxEntry, mapUser }: GenericIndexDispatchedProps) => {
  const map = {
    data: store[reduxEntry].model.data,
    user: undefined,
    isLoading: store[reduxEntry].model.isLoading,
  };
  if (mapUser) {
    map.user = store.user.model.data;
  }
  return map;
};

export const GenericFormScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedGenericFormScene);
