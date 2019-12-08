export interface LoginTranslation {
  title: string;
  subTitle: string;
  email: string;
  username: string;
  password: string;
  forgotPassword: string;
  register: string;
  button: string;
}

interface Translation {
  fi: LoginTranslation;
  en: LoginTranslation;
}

const LoginSceneTranslation: Translation = {
  fi: {
    title: 'Kirjaudu',
    subTitle: 'Täytä tiedot ja kirjaudu sisään',
    email: 'Sähköposti',
    username: 'Käyttäjänimi',
    password: 'Salasana',
    forgotPassword: 'Unohditko salasanasi?',
    register: 'Oletko uusi? Luo tunnus!',
    button: 'Kirjaudu',
  },
  en: {
    title: 'Login',
    subTitle: 'Fill form and login',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    register: 'New? Create new account!',
    button: 'Login',
  },
};

export default LoginSceneTranslation;
