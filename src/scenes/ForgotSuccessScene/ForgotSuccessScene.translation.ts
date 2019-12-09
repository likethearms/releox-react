import { Translation } from '../../Translation.d';

export interface ForgotSuccessTranslation {
  ForgotSuccessScene: {
    toLogin: string;
    title: string;
    subTitle: string;
  };
}

const ForgotSuccessSceneTranslation: Translation<ForgotSuccessTranslation> = {
  fi: {
    ForgotSuccessScene: {
      title: 'Salasanan nollauspyyntö lähetetty!',
      toLogin: 'Takaisin kirjautumissivulle',
      subTitle:
        'Salasanan nollauslinkki on lähetetty sähköpostiisi! Avaa sähköpostissa oleva linkki ja vaihda salasana.',
    },
  },
  en: {
    ForgotSuccessScene: {
      title: 'Reset email is sent!',
      toLogin: 'Back to login',
      subTitle:
        'Password reset link is sent to your email. Click link on your email and change password.',
    },
  },
};

export default ForgotSuccessSceneTranslation;
