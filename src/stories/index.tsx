import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '../components/Card';


storiesOf('Card', module)
  .add('just card', () => <Card>Hello</Card>)
