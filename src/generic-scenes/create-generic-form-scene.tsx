import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { goBack } from 'react-router-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { Card } from '../components/Card/Card';
import { CardTitle } from '../components/CardTitle/CardTitle';
import { Loading } from '../components/Loading/Loading';
import { Button } from '../components/Button/Button';

interface ContactCreateSceneProps<T> {
  save(body: T): void;
  back(): void;
  fetch?(): void;
  del?(): void;
  user: any;
  isLoading: boolean;
}

export const createGenericFormScene = <T extends {}>(
  title: string,
  EmbedForm: any,
  initialValues: T,
  saveAction: Function,
  entity: string,
  fetchAction?: (id: number) => any,
  delAction?: (id: number) => any,
  injectUserFields: string[] = [],
  redirect?: string
) => {
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
  const mapStateToProps = (store: any) => ({
    user: store.user,
    data: store[entity].model.data,
    isLoading: store[entity].model.isLoading,
  });

  const ContactCreateScene = (props: ContactCreateSceneProps<T>) => {
    const { user, isLoading, save, fetch, del, back } = props;
    const iv = initialValues as any;
    injectUserFields.map((key) => {
      iv[key] = user[key];
      return true;
    });
    return (
      <GenericFormScene
        data={iv}
        title={title}
        EmbedForm={EmbedForm}
        isLoading={isLoading}
        back={back}
        fetch={fetch}
        save={save}
        del={del}
      />
    );
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactCreateScene);
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
  EmbedForm: any;
  isLoading?: boolean;
  save(body: T): void;
  back(): void;
  fetch?: () => void;
  del?: () => void;
}

export const GenericFormScene = <T extends {}>(props: GenericFormSceneProps<T>) => {
  const { data, EmbedForm, title, isLoading, save, del, fetch, back } = props;
  useEffect(() => {
    if (fetch) fetch();
  }, [fetch]);
  if (isLoading) return <Loading centeredVertical />;
  return (
    <GenericFormLayout title={title}>
      <div>
        <Formik onSubmit={save} initialValues={data}>
          {() => (
            <Form>
              <EmbedForm />
              <Button id="GenericFormScene-back" onClick={back}>
                Back
              </Button>
              <Button type="submit" id="GenericFormScene-submit" className="float-right">
                Save
              </Button>
            </Form>
          )}
        </Formik>
        {del ? (
          <div>
            <hr />
            <Button id="delete-button" color="danger" onClick={del}>
              Delete
            </Button>
          </div>
        ) : (
          undefined
        )}
      </div>
    </GenericFormLayout>
  );
};
