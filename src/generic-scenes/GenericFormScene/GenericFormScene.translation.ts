import { Translation } from '../../Translation.d';

export interface GenericFormTranslation {
  GenericFormScene: {
    save: string;
    back: string;
    delete: string;
  };
}

const GenericFormSceneTranslation: Translation<GenericFormTranslation> = {
  fi: {
    GenericFormScene: {
      save: 'Tallenna',
      back: 'Takaisin',
      delete: 'Poista',
    },
  },
  en: {
    GenericFormScene: {
      save: 'Save',
      back: 'Back',
      delete: 'Delete',
    },
  },
};

export default GenericFormSceneTranslation;
