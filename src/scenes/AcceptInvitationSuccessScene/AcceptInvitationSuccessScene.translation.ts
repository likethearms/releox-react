import { Translation } from '../../Translation.d';

export interface AcceptInvitationSuccessTranslation {
  AcceptInvitationSuccessScene: {
    toLogin: string;
    title: string;
    subTitle: string;
  };
}

const AcceptInvitationSuccessSceneTranslation: Translation<AcceptInvitationSuccessTranslation> = {
  fi: {
    AcceptInvitationSuccessScene: {
      title: 'Salasanasi on tallennettu',
      toLogin: 'Kirjautumissivulle',
      subTitle: 'Tunnuksesi on valmis. Voit nyt kirjautua ohjelmaan.',
    },
  },
  en: {
    AcceptInvitationSuccessScene: {
      title: 'Your password is saved',
      toLogin: 'To Login',
      subTitle: 'Your password is saved. You can now login.',
    },
  },
};

export default AcceptInvitationSuccessSceneTranslation;
