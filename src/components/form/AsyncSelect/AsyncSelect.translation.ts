import { Translation } from '../../../Translation.d';

export interface AsyncSelectTranslation {
  AsyncSelect: {
    loading: string;
    placeholder: string;
  };
}

const AsyncSelectTranslations: Translation<AsyncSelectTranslation> = {
  fi: {
    AsyncSelect: {
      loading: 'Lataa...',
      placeholder: 'Valitse...',
    },
  },
  en: {
    AsyncSelect: {
      loading: 'Loading...',
      placeholder: 'Select...',
    },
  },
};

export default AsyncSelectTranslations;
