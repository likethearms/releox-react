import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../releox.css';
import { storiesOf } from '@storybook/react';
import CenterContent from '../components/CenterContent/CenterContent';
import Loading from '../components/Loading/Loading';
import FormikFormWrapper from '../components/FormikFormWrapper/FormikFormWrapper';
import { Field } from 'formik';
import { action } from '@storybook/addon-actions';
import LoginScene from '../scenes/LoginScene';
import Button from '../components/Button/Button';
import { MemoryRouter } from 'react-router';

storiesOf('Components', module)
  .add('CenterContent', () => (
    <CenterContent>
      CenterContent
    </CenterContent>
  ))
  .add('Loading', () => <Loading />)
  .add('Button', () => <Button id="save-button">Save</Button>);

storiesOf('Form', module)
  .add('FormikFormWrapper', () => (
    <FormikFormWrapper<any>
      onSubmit={action('onSubmit')}
      initialValues={{ name: '' }}>
      <Field name="name" type="input" />
    </FormikFormWrapper>
  ));

storiesOf('Scenes', module)
  .addDecorator(c => <MemoryRouter>{c()}</MemoryRouter>)
  .add('Login', () => <LoginScene />)
  .add('Login with register', () => <LoginScene registerUrl="/register" />);
