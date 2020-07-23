import React from 'react';
import { GenericForm, GenericFormPropsBase } from './GenericForm';

type GenericFormCreateSubmit = (body: any, options?: { redirect?: string }) => any;

interface Props extends GenericFormPropsBase {
  onSubmit: GenericFormCreateSubmit;
}

export const GenericCreateForm = (props: Props) => {
  const {
    initialValues,
    onSubmit,
    onSubmitOptions,
    tNamespace,
    validationSchema,
    onBack,
    EmbedForm,
    loadingSelector,
    colClassName,
    rowClassName,
  } = props;
  return (
    <GenericForm
      initialValues={initialValues}
      tNamespace={tNamespace}
      rowClassName={rowClassName}
      colClassName={colClassName}
      validationSchema={validationSchema}
      onBack={onBack}
      onSubmit={onSubmit}
      onSubmitOptions={onSubmitOptions}
      EmbedForm={EmbedForm}
      loadingSelector={loadingSelector}
    />
  );
};
