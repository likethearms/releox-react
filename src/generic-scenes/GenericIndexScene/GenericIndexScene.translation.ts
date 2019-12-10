import { Translation } from '../../Translation.d';

export interface GenericIndexTranslation {
  GenericIndexScene: {
    addNew: string;
  };
}

const GenericIndexSceneTranslation: Translation<GenericIndexTranslation> = {
  fi: {
    GenericIndexScene: {
      addNew: 'Luo uusi',
    },
  },
  en: {
    GenericIndexScene: {
      addNew: 'Add new',
    },
  },
};

export default GenericIndexSceneTranslation;
