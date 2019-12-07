import React, { useEffect, useState } from 'react';
import { Formik, Form, FormikErrors } from 'formik';
import { goBack } from 'react-router-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ObjectSchema } from 'yup';
import { connect } from 'react-redux';
import { Card } from '../components/Card/Card';
import { CardTitle } from '../components/CardTitle/CardTitle';
import { Button } from '../components/Button/Button';
import { Loading } from '../components/Loading/Loading';
import { ct } from '../I18N';

interface ContactCreateSceneProps<T> {
  save(body: T): void;
  back(): void;
  fetch?(): void;
  del?(): void;
  data: T;
  user: any;
  isLoading: boolean;
  match: any;
}

interface GenericFormOptions {
  validate?: (values: any) => FormikErrors<any> | Promise<any>;
  validationSchema?: ObjectSchema<any> | (() => ObjectSchema<any>);
  title: string;
  EmbedForm: any;
  initialValues: any | ((data: any) => any);
  saveAction: Function;
  reduxEntry: string;
  fetchAction?: (id: number) => any;
  delAction?: (id: number) => any;
  redirect?: string;
  mapUser?: boolean;
  valuesFormatter?: (data: any) => any;
}

export const createGenericFormScene = <T extends {}>(opts: GenericFormOptions) => {
  const {
    validate,
    validationSchema,
    title,
    EmbedForm,
    initialValues,
    saveAction,
    reduxEntry,
    fetchAction,
    delAction,
    redirect,
    valuesFormatter,
    mapUser,
  } = opts;

  const mapDispatchToProps = (
    dispatch: ThunkDispatch<void, void, Action>,
    { match }: { match: any }
  ) => {
    const { id } = match.params;
    const updateOpts = { redirect };
    const out: any = {};
    out.back = () => dispatch(goBack());
    if (fetchAction) out.fetch = () => dispatch(fetchAction(id));
    if (delAction) out.del = () => dispatch(delAction(id));
    if (id) out.save = (body: T) => dispatch(saveAction(id, body, updateOpts));
    else out.save = (body: T) => dispatch(saveAction(body, redirect));
    return out;
  };
  const mapStateToProps = (store: any) => {
    const map: any = {
      data: store[reduxEntry].model.data,
      isLoading: store[reduxEntry].model.isLoading,
    };
    if (mapUser) {
      map.user = store.user.model.data;
    }
    return map;
  };

  const ContactCreateScene = (props: ContactCreateSceneProps<T>) => {
    const { user, isLoading, save, fetch, del, back, data, match } = props;
    const [isFetched, setIsFetched] = useState(false);
    let initValues: any;
    let init;

    if (typeof initialValues === 'object') init = initialValues;
    else init = initialValues({ user, match });

    if (!fetch) initValues = init;
    else initValues = { ...init, ...data };

    if (valuesFormatter) initValues = valuesFormatter(initValues);

    return (
      <GenericFormScene
        data={initValues}
        title={title}
        user={user}
        validationSchema={validationSchema}
        validate={validate}
        EmbedForm={EmbedForm}
        isLoading={isLoading || !isFetched}
        setIsFetched={setIsFetched}
        back={back}
        fetch={fetch}
        save={save}
        del={del}
      />
    );
  };
  return connect(mapStateToProps, mapDispatchToProps)(ContactCreateScene);
};

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

export interface GenericFormSceneProps<T> {
  data: any;
  title: string;
  user?: any;
  EmbedForm: any;
  isLoading?: boolean;
  validate?: (values: any) => FormikErrors<any> | Promise<any>;
  validationSchema?: ObjectSchema<any> | (() => ObjectSchema<any>);
  setIsFetched(value: boolean): void;
  save(body: T): void;
  back(): void;
  fetch?: () => void;
  del?: () => void;
}

const GenericFormScene = <T extends {}>(props: GenericFormSceneProps<T>) => {
  const {
    data,
    EmbedForm,
    title,
    isLoading,
    save,
    del,
    fetch,
    back,
    setIsFetched,
    validate,
    validationSchema,
    user,
  } = props;
  useEffect(() => {
    if (fetch) fetch();
    setIsFetched(true);
  }, [fetch, setIsFetched]);
  const t = ct('genericForm');
  if (isLoading) return <Loading centeredVertical />;
  return (
    <GenericFormLayout title={title}>
      <div>
        <Formik
          onSubmit={save}
          initialValues={data}
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
          <div>
            <hr />
            <Button id="delete-button" color="danger" onClick={del}>
              {t('delete')}
            </Button>
          </div>
        ) : (
          undefined
        )}
      </div>
    </GenericFormLayout>
  );
};
