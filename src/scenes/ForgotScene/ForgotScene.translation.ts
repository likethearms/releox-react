import { Translation } from '../../Translation.d';

export interface ForgotTranslation {
  ForgotScene: {
    linkText: string;
    title: string;
    subTitle: string;
    button: string;
    email: string;
  };
}

const ForgotSceneTranslation: Translation<ForgotTranslation> = {
  fi: {
    ForgotScene: {
      button: 'Nollaa',
      linkText: 'Takaisin kirjautumissivulle',
      title: 'Nollaa salasana',
      subTitle:
        'Kirjoita sähköpostiosoitteesi, niin lähetämme sinulle linkin, jolla voit vaihtaa salasanasi.',
      email: 'Sähköposti',
    },
  },
  en: {
    ForgotScene: {
      button: 'Reset',
      linkText: 'Back to login',
      title: 'Reset your password',
      subTitle: 'Please write your email and we send you password reset link.',
      email: 'Email',
    },
  },
};

export default ForgotSceneTranslation;
