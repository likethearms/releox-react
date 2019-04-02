import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './testing-cra/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './releox.css';

reactDom.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('root'),
);
