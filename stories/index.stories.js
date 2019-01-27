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

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Scenes', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      {story()}
    </MemoryRouter>
  ))
  .add('LoginScene', () => <LoginScene />)
  .add('ForgotScene', () => <ForgotScene passwordResetAPIUrl="http://localhost:3001/api/Members/reset" />);

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
  .add('CardLink', () => (
    <Card>
      <CardLink linkString="/link|fa fa-user" />
      <CardLink linkString="/link|Text" />
    </Card>
  ));
