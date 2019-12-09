import { Translation } from '../../Translation.d';

export interface ResetPasswordSuccessTranslation {
  ResetPasswordSuccessScene: {
    toLogin: string;
    title: string;
    subTitle: string;
  };
}

const ResetPasswordSuccessSceneTranslation: Translation<ResetPasswordSuccessTranslation> = {
  fi: {
    ResetPasswordSuccessScene: {
      title: 'Salasanasi on vaihdettu',
      toLogin: 'Kirjautumissivulle',
      subTitle:
        'Salasanasi on vaihdettu onnistuneesti. Voit nyt palata kirjautumissivulle ja kirjautua uudella salasanalla',
    },
  },
  en: {
    ResetPasswordSuccessScene: {
      title: 'Your password is changed',
      toLogin: 'To login',
      subTitle: 'Your password is now changed. Go back to login page and log in with new password.',
    },
  },
};

export default ResetPasswordSuccessSceneTranslation;
