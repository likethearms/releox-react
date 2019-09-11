import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moxios from 'moxios';
import { Field } from 'formik';
import { MemoryRouter } from 'react-router';
import { action } from '@storybook/addon-actions';
import '../releox.css';
import { storiesOf } from '@storybook/react';
import { CenterContent } from '../components/CenterContent/CenterContent';
import { Loading } from '../components/Loading/Loading';
import { Button } from '../components/Button/Button';
import { FormikFormWrapper } from '../components/FormikFormWrapper/FormikFormWrapper';
import { LoginScene } from '../scenes/LoginScene/LoginScene';
import { ForgotScene } from '../scenes/ForgotScene/ForgotScene';
import { ForgotSuccessScene } from '../scenes/ForgotSuccessScene/ForgotSuccessScene';
import { ResetPasswordScene } from '../scenes/ResetPasswordScene/ResetPasswordScene';
import { ResetPasswordSuccessScene } from '../scenes/ResetPasswordSuccessScene/ResetPasswordSuccessScene';
import { AsyncSelectFormik } from '../components/AsyncSelect/AsyncSelectFormik';
import { AuthErrorScene } from '../scenes/AuthErrorScene/AuthErrorScene';
import { ConfirmScene } from '../scenes/ConfirmScene/ConfirmScene';
import { AcceptInvitationScene } from '../scenes/AcceptInvitationScene/AcceptInvitationScene';
import { AcceptInvitationSuccessScene } from '../scenes/AcceptInvitationSuccessScene/AcceptInvitationSuccessScene';

moxios.install();
moxios.stubRequest(/undefined.Members.user*/, {
  status: 200,
});
moxios.stubRequest(/Products/, {
  status: 200,
  response: [
    {
      id: 1,
      name: 'Foo',
    },
    {
      id: 2,
      name: 'Bar',
    },
  ],
});

moxios.stubRequest(/.*/, {
  status: 400,
  response: {
    error: {
      message: 'Something went wrong',
    },
  },
});

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
      initialValues={{ name: '' }}
    >
      <Field name="name" type="input" />
      <AsyncSelectFormik
        getUrl="/Products/"
        queryFormat="mongodb"
        label="Products"
        name="products"
      />
    </FormikFormWrapper>
  ));

storiesOf('Scenes', module)
  .addDecorator((c) => <MemoryRouter>{c()}</MemoryRouter>)
  .add('Login', () => <LoginScene />)
  .add('Forgot', () => <ForgotScene />)
  .add('ForgotSuccess', () => <ForgotSuccessScene />)
  .add('ResetPassword', () => <ResetPasswordScene />)
  .add('ResetPasswordSuccess', () => <ResetPasswordSuccessScene />)
  .add('AuthError', () => <AuthErrorScene />)
  .add('Confirm', () => <ConfirmScene />)
  .add('AcceptInvitation', () => <AcceptInvitationScene />)
  .add('AcceptInvitationSuccess', () => <AcceptInvitationSuccessScene />);
