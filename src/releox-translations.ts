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
import validateModelTranslation from './HOC/validate-model/validate-model.translation';
import GenericIndexSceneTranslation from './generic-scenes/GenericIndexScene/GenericIndexScene.translation';
import DataTableTranslation from './components/DataTable/DataTable.translation';
import GenericFormSceneTranslation from './generic-scenes/GenericFormScene/GenericFormScene.translation';

export const releoxTranslations = deepmerge.all([
  AcceptInvitationSuccessSceneTranslation,
  AcceptInvitationSceneTranslation,
  AuthErrorSceneTranslation,
  DataTableTranslation,
  ConfirmSceneTranslation,
  ForgotSceneTranslation,
  ForgotSuccessSceneTranslation,
  GenericIndexSceneTranslation,
  GenericFormSceneTranslation,
  LoginSceneTranslation,
  ResetPasswordSceneTranslation,
  ResetPasswordSuccessSceneTranslation,
  validateModelTranslation,
]) as any;
