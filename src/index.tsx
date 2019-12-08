import React from 'react';
import ReactDom from 'react-dom';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from './testing-cra/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import './releox.css';
import { releoxTranslations } from './releox-translations';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  keySeparator: false, // we do not use keys in form messages.welcome
  lng: 'fi',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  resources: releoxTranslations,
});

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
