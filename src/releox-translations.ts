import deepmerge from 'deepmerge';
import LoginSceneTranslation from './scenes/LoginScene/LoginScene.translation';
import ForgotSceneTranslation from './scenes/ForgotScene/ForgotScene.translation';

export const releoxTranslations = deepmerge.all([
  LoginSceneTranslation,
  ForgotSceneTranslation,
]) as any;
