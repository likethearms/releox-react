import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { releoxTranslations } from './releox-translations';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  lng: 'en',
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  resources: releoxTranslations,
});

configure({ adapter: new Adapter() });
