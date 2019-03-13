import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../releox.css';
import { storiesOf } from '@storybook/react';
import CenterContent from '../components/CenterContent/CenterContent';
import Loading from '../components/Loading/Loading';


storiesOf('Components', module)
  .add('CenterContent', () => (
    <CenterContent>
      CenterContent
    </CenterContent>
  ))
  .add('Loading', () => <Loading />)
