import { Translation } from '../../Translation.d';

export interface GenericFormTranslation {
  GenericForm: {
    save: string;
    back: string;
    delete: string;
  };
}

const GenericFormTranslations: Translation<GenericFormTranslation> = {
  fi: {
    GenericForm: {
      save: 'Tallenna',
      back: 'Takaisin',
      delete: 'Poista',
    },
  },
  en: {
    GenericForm: {
      save: 'Save',
      back: 'Back',
      delete: 'Delete',
    },
  },
};

export default GenericFormTranslations;
