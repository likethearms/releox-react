import React from 'react';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import { URL } from '../../routes';
import Translation from '../../interfaces/Translation';
import SuccessSceneTranslationObject from '../../interfaces/SuccessSceneTranslationObject';

export interface ResetPasswordSuccessSceneProps {
  locale?: string;
}

const translation: Translation<SuccessSceneTranslationObject> = {
  fi: {
    title: 'Salasanasi on vaihdettu',
    link: 'Kirjautumissivulle',
    subTitle: 'Salasanasi on vaihdettu onnistuneesti. Voit nyt palata'
      + ' kirjautumissivulle ja kirjautua uudella salasanalla',
  },
};

const ResetPasswordSuccessScene = ({ locale }: ResetPasswordSuccessSceneProps) =>
  <AuthLayout
    title={translation[locale as string].title}
    subTitle={translation[locale as string].subTitle}
    context="ResetPasswordSuccessScene"
    links={[
      {
        to: URL.LOGIN,
        id: 'login-link',
        text: translation[locale as string].link,
      },
    ]}
  />;

ResetPasswordSuccessScene.defaultProps = {
  locale: 'fi',
};

export default ResetPasswordSuccessScene;
