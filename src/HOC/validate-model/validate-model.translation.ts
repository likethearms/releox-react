import { Translation } from '../../Translation.d';

export interface ValidateModelTranslation {
  validateModel: {
    title: string;
    subTitle: string;
    button: string;
  };
}

const validateModelTranslation: Translation<ValidateModelTranslation> = {
  fi: {
    validateModel: {
      title: 'Viimeistele tunnus',
      subTitle: 'Viimeistele tunnus antamalla kaikki tarvittavat tiedot',
      button: 'Tallenna',
    },
  },
  en: {
    validateModel: {
      title: 'Complete your account',
      subTitle: 'Complete missing information and click save',
      button: 'Save',
    },
  },
};

export default validateModelTranslation;
