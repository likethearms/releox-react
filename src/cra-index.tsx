import React from 'react';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import ReactDom from 'react-dom';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter, Router } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import App from './testing-cra/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import './releox.css';
import { releoxTranslations } from './releox-translations';
import { itemReducer } from './testing-cra/actions';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  keySeparator: false, // we do not use keys in form messages.welcome
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  resources: releoxTranslations,
});

const history = createBrowserHistory();

const store = createStore(
  combineReducers({ itemReducer }),
  applyMiddleware(reduxThunk, routerMiddleware(history))
);

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Router>
  </Provider>,
  document.getElementById('root')
);
