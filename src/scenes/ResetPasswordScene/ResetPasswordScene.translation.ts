import { Translation } from '../../Translation.d';

export interface ResetPasswordTranslation {
  ResetPasswordScene: {
    button: string;
    password: string;
    title: string;
    subTitle: string;
  };
}

const ResetPasswordSceneTranslation: Translation<ResetPasswordTranslation> = {
  fi: {
    ResetPasswordScene: {
      title: 'Kirjoita uusi salasana',
      subTitle: 'Kirjoita uusi salasanasi ja paina tallenna',
      password: 'Salasana',
      button: 'Tallenna',
    },
  },
  en: {
    ResetPasswordScene: {
      title: 'Set new password',
      subTitle: 'Write new password and click save!',
      password: 'Password',
      button: 'Save',
    },
  },
};

export default ResetPasswordSceneTranslation;
