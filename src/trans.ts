import LoginSceneTranslation, {
  LoginTranslation,
} from './scenes/LoginScene/LoginScene.translation';

export interface LanguageTranslation {
  LoginScene: LoginTranslation;
}

export interface Translation {
  fi: LanguageTranslation;
  en: LanguageTranslation;
}

const resource: Translation = {
  fi: {
    LoginScene: LoginSceneTranslation.fi,
  },
  en: {
    LoginScene: LoginSceneTranslation.en,
  },
};

export const translations = resource as any;
