import React from 'react';
import '../node_modules/@coreui/coreui/dist/css/coreui.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './decorator.css';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import LoginScene from '../src/scenes/LoginScene';
import AuthLayout from '../src/components/AuthLayout';
import Card from '../src/components/Card';
import CardLink from '../src/components/CardLink';
import InputInlineGroup from '../src/components/InputInlineGroup';
import ForgotScene from '../src/scenes/ForgotScene';
import Loading from '../src/components/Loading';
import ResetPasswordScene from '../src/scenes/ResetPasswordScene';
import CenterContent from '../src/components/CenterContent';
import OneInputActionForm from '../src/components/OneInputActionForm';
import AcceptInvitationScene from '../src/scenes/AcceptInvitationScene';
import AuthBlockMessage from '../src/components/AuthBlockMessage';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Scenes', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      {story()}
    </MemoryRouter>
  ))
  .add('LoginScene', () => <LoginScene />)
  .add('AcceptInvitationScene', () => <AcceptInvitationScene skipValidation />)
  .add('ForgotScene', () => <ForgotScene passwordResetAPIUrl="http://localhost:3001/api/Members/reset" />)
  .add('ResetPasswordScene', () => <ResetPasswordScene skipValidation />);

storiesOf('Components', module)
  .add('AuthLayout', () => <AuthLayout />)
  .addDecorator(story => (
    <div className="app flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            {story()}
          </div>
        </div>
      </div>
    </div>
  ))
  .add('Card', () => <Card />)
  .add('CenterContent', () => <CenterContent>Content</CenterContent>)
  .add('AuthOneInputCard', () => (
    <OneInputActionForm
      label="fa fa-user"
      placeholder="Name"
      buttonText="Save"
      title="The title"
      subTitle="The Subtitle"
      onSubmit={() => { }}
      value=""
      name="name"
      onChange={() => { }}
    />
  ))
  .add('Loading', () => <Loading />)
  .add('InputInlineGroup', () => (
    <div>
      <InputInlineGroup
        onChange={() => { }}
        value=""
        label="fa fa-user"
        placeholder="Name"
        name="name"
        type="text"
      />
      <InputInlineGroup
        onChange={() => { }}
        value=""
        label="Name"
        placeholder="Name"
        name="name"
        type="text"
      />
    </div>
  ));

storiesOf('ReactRouterDom', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              {story()}
            </div>
          </div>
        </div>
      </div>
    </MemoryRouter>
  ))
  .add('AuthBlockMessage', () => <AuthBlockMessage message="Hello world!" />)
  .add('CardLink', () => (
    <Card>
      <CardLink linkString="/link|fa fa-user" />
      <CardLink linkString="/link|Text" />
    </Card>
  ));
