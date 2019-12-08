import { Translation } from '../../Translation.d';

export interface LoginTranslation {
  LoginScene: {
    title: string;
    subTitle: string;
    email: string;
    username: string;
    password: string;
    forgotPassword: string;
    register: string;
    button: string;
  };
}

const LoginSceneTranslation: Translation<LoginTranslation> = {
  fi: {
    LoginScene: {
      title: 'Kirjaudu',
      subTitle: 'Täytä tiedot ja kirjaudu sisään',
      email: 'Sähköposti',
      username: 'Käyttäjänimi',
      password: 'Salasana',
      forgotPassword: 'Unohditko salasanasi?',
      register: 'Oletko uusi? Luo tunnus!',
      button: 'Kirjaudu',
    },
  },
  en: {
    LoginScene: {
      title: 'Login',
      subTitle: 'Fill form and login',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      register: 'New? Create new account!',
      button: 'Login',
    },
  },
};

export default LoginSceneTranslation;
