import LoginSceneTranslation, {
  LoginTranslation,
} from './scenes/LoginScene/LoginScene.translation';
import { Translation } from './Translation.d';
import ForgotSceneTranslation, {
  ForgotTranslation,
} from './scenes/ForgotScene/ForgotScene.translation';

export interface LanguageTranslation {
  LoginScene: LoginTranslation;
  ForgotScene: ForgotTranslation;
}

const resource: Translation<LanguageTranslation> = {
  fi: {
    LoginScene: LoginSceneTranslation.fi,
    ForgotScene: ForgotSceneTranslation.fi,
  },
  en: {
    LoginScene: LoginSceneTranslation.en,
    ForgotScene: ForgotSceneTranslation.en,
  },
};

export const releoxTranslations = resource as any;
