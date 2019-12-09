import { Translation } from '../../Translation.d';

export interface AuthErrorTranslation {
  AuthErrorScene: {
    toLogin: string;
    title: string;
    subTitle: string;
  };
}

const AuthErrorSceneTranslation: Translation<AuthErrorTranslation> = {
  fi: {
    AuthErrorScene: {
      title: 'Oops... Tapahtui virhe',
      toLogin: 'Kirjautumissivulle',
      subTitle: 'Emme kyenneet löytämään virheen syytä.',
    },
  },
  en: {
    AuthErrorScene: {
      title: 'Oops... There was an error',
      toLogin: 'To login',
      subTitle: "We couldn't find reason for an error.",
    },
  },
};

export default AuthErrorSceneTranslation;
