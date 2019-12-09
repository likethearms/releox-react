import deepmerge from 'deepmerge';
import LoginSceneTranslation from './scenes/LoginScene/LoginScene.translation';
import ForgotSceneTranslation from './scenes/ForgotScene/ForgotScene.translation';
import ForgotSuccessSceneTranslation from './scenes/ForgotSuccessScene/ForgotSuccessScene.translation';
import ResetPasswordSceneTranslation from './scenes/ResetPasswordScene/ResetPasswordScene.translation';
import ResetPasswordSuccessSceneTranslation from './scenes/ResetPasswordSuccessScene/ResetPasswordSuccessScene.translation';
import AuthErrorSceneTranslation from './scenes/AuthErrorScene/AuthErrorScene.translation';
import ConfirmSceneTranslation from './scenes/ConfirmScene/ConfirmScene.translation';
import AcceptInvitationSceneTranslation from './scenes/AcceptInvitationScene/AcceptInvitationScene.translation';
import AcceptInvitationSuccessSceneTranslation from './scenes/AcceptInvitationSuccessScene/AcceptInvitationSuccessScene.translation';

export const releoxTranslations = deepmerge.all([
  LoginSceneTranslation,
  ForgotSceneTranslation,
  ForgotSuccessSceneTranslation,
  ResetPasswordSceneTranslation,
  ResetPasswordSuccessSceneTranslation,
  AuthErrorSceneTranslation,
  AcceptInvitationSceneTranslation,
  AcceptInvitationSuccessSceneTranslation,
  ConfirmSceneTranslation,
]) as any;
