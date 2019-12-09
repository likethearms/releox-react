import { Translation } from '../../Translation.d';

export interface ConfirmTranslation {
  ConfirmScene: {
    toLogin: string;
    title: string;
    subTitle: string;
  };
}

const ConfirmSceneTranslation: Translation<ConfirmTranslation> = {
  fi: {
    ConfirmScene: {
      title: 'Tunnuksesi on nyt aktivoitu',
      toLogin: 'Takaisin',
      subTitle: 'Tunnuksesi on aktivoitu. Voit nyt jatkaa ohjelman käyttöä',
    },
  },
  en: {
    ConfirmScene: {
      title: 'Your account is now activated.',
      toLogin: 'Back',
      subTitle: 'Your account is now activated. You can now continue using application.',
    },
  },
};

export default ConfirmSceneTranslation;
