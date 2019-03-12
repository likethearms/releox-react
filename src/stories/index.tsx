import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../releox.css';
import { storiesOf } from '@storybook/react';
import CenterContent from '../components/CenterContent/CenterContent';


storiesOf('CenterContent', module)
  .add('just card', () => (
    <CenterContent>
      <div className="col-md-5">
        Fi
    </div>
    </CenterContent>
  ))
