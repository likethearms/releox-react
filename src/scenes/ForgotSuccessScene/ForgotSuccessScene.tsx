import React from 'react';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import { URL } from '../../routes';
import Translation from '../../interfaces/Translation';
import SuccessSceneTranslationObject from '../../interfaces/SuccessSceneTranslationObject';

export interface ForgotSuccessSceneProps {
  locale?: string;
}

const translation: Translation<SuccessSceneTranslationObject> = {
  fi: {
    title: 'Salasannan nollaus pyyntö lähetetty!',
    link: 'Kirjautumissivulle',
    subTitle: 'Salasanan nollaus linkki on lähetetty sähköpostiisi!'
      + ' Avaa sähköpostissa oleva linkki ja vaihda salasana.',
  },
};

const ForgotSuccessScene = ({ locale }: ForgotSuccessSceneProps) =>
  <AuthLayout
    title={translation[locale as string].title}
    subTitle={translation[locale as string].subTitle}
    context="ForgotSuccessScene"
    links={[
      {
        to: URL.LOGIN,
        id: 'login-link',
        text: translation[locale as string].link,
      },
    ]}
  />;

ForgotSuccessScene.defaultProps = {
  locale: 'fi',
};

export default ForgotSuccessScene;