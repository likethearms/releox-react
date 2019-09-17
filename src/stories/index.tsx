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
import { Card } from '../components/Card/Card';
import { CardTitle } from '../components/CardTitle/CardTitle';

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
  .add('Button', () => <Button id="save-button">Save</Button>)
  .add('Card', () => (
    <CenterContent>
      <CenterContent>
        <Card>
          <CardTitle>Card title</CardTitle>
          <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus porro incidunt ea ipsum mollitia illo delectus saepe impedit vitae exercitationem! Voluptatem alias sint obcaecati? Possimus temporibus ut nostrum eligendi blanditiis.</p>
        </Card>
      </CenterContent>
    </CenterContent>
  ))
  .add('Header card', () => (
    <CenterContent>
      <Card header={<span style={{ fontSize: '16pt' }}>Hello</span>} className="fancy-card">
        <CardTitle>Card title</CardTitle>
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
      </Card>
    </CenterContent>
  ));


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
  .add('Login titleBlock', () => (
    <LoginScene
      titleBlock={(
        <div className="text-center">
          <h1>Service title</h1>
          <img alt="" src="https://loremflickr.com/300/200" />
        </div>
      )}
    />
  ))
  .add('Forgot', () => <ForgotScene />)
  .add('ForgotSuccess', () => <ForgotSuccessScene />)
  .add('ResetPassword', () => <ResetPasswordScene />)
  .add('ResetPasswordSuccess', () => <ResetPasswordSuccessScene />)
  .add('AuthError', () => <AuthErrorScene />)
  .add('Confirm', () => <ConfirmScene />)
  .add('AcceptInvitation', () => <AcceptInvitationScene />)
  .add('AcceptInvitationSuccess', () => <AcceptInvitationSuccessScene />);
