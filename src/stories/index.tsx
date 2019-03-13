import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../releox.css';
import { storiesOf } from '@storybook/react';
import CenterContent from '../components/CenterContent/CenterContent';
import Loading from '../components/Loading/Loading';
import FormikFormWrapper from '../components/FormikFormWrapper/FormikFormWrapper';
import { Field } from 'formik';
import { action } from '@storybook/addon-actions';


storiesOf('Components', module)
  .add('CenterContent', () => (
    <CenterContent>
      CenterContent
    </CenterContent>
  ))
  .add('Loading', () => <Loading />)

storiesOf('Form', module)
  .add('FormikFormWrapper', () => (
    <FormikFormWrapper<any>
      onSubmit={action('onSubmit')}
      initialValues={{ name: '' }}>
      <Field name="name" type="input" />
    </FormikFormWrapper>
  ));
