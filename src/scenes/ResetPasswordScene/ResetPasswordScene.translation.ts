import { Translation } from '../../Translation.d';

export interface ResetPasswordTranslation {
  ResetPasswordScene: {
    button: string;
    password: string;
    title: string;
    siteTitle: string;
    subTitle: string;
  };
}

const ResetPasswordSceneTranslation: Translation<ResetPasswordTranslation> = {
  fi: {
    ResetPasswordScene: {
      siteTitle: 'Vaihda salasana',
      title: 'Kirjoita uusi salasana',
      subTitle: 'Kirjoita uusi salasanasi ja paina tallenna',
      password: 'Salasana',
      button: 'Tallenna',
    },
  },
  en: {
    ResetPasswordScene: {
      siteTitle: 'Change password',
      title: 'Set new password',
      subTitle: 'Write new password and click save!',
      password: 'Password',
      button: 'Save',
    },
  },
};

export default ResetPasswordSceneTranslation;
