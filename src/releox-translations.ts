import deepmerge from 'deepmerge';
import DataTableTranslation from './components/DataTable/DataTable.translation';
import AsyncSelectTranslations from './components/form/AsyncSelect/AsyncSelect.translation';
import GenericFormTranslations from './generic-scenes/GenericForm/GenericForm.translation';
import GenericFormSceneTranslation from './generic-scenes/GenericFormScene/_GenericFormScene.translation';
import GenericIndexSceneTranslation from './generic-scenes/_GenericIndexScene/_GenericIndexScene.translation';
import validateModelTranslation from './HOC/validate-model/validate-model.translation';
import AcceptInvitationSceneTranslation from './scenes/AcceptInvitationScene/AcceptInvitationScene.translation';
import AcceptInvitationSuccessSceneTranslation from './scenes/AcceptInvitationSuccessScene/AcceptInvitationSuccessScene.translation';
import AuthErrorSceneTranslation from './scenes/AuthErrorScene/AuthErrorScene.translation';
import ConfirmSceneTranslation from './scenes/ConfirmScene/ConfirmScene.translation';
import ForgotSceneTranslation from './scenes/ForgotScene/ForgotScene.translation';
import ForgotSuccessSceneTranslation from './scenes/ForgotSuccessScene/ForgotSuccessScene.translation';
import LoginSceneTranslation from './scenes/LoginScene/LoginScene.translation';
import ResetPasswordSceneTranslation from './scenes/ResetPasswordScene/ResetPasswordScene.translation';
import ResetPasswordSuccessSceneTranslation from './scenes/ResetPasswordSuccessScene/ResetPasswordSuccessScene.translation';

export const releoxTranslations = deepmerge.all([
  AcceptInvitationSuccessSceneTranslation,
  AcceptInvitationSceneTranslation,
  AsyncSelectTranslations,
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
  GenericFormTranslations,
]) as any;
