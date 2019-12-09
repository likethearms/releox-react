import { Translation } from '../../Translation.d';

export interface AcceptInvitationTranslation {
  AcceptInvitationScene: {
    password: string;
    title: string;
    subTitle: string;
    button: string;
  };
}

const AcceptInvitationSceneTranslation: Translation<AcceptInvitationTranslation> = {
  fi: {
    AcceptInvitationScene: {
      button: 'Tallenna',
      title: 'Viimeistele tunnuksesi',
      subTitle: 'Anna salasanasi, niin pääset kirjautumaan.',
      password: 'Salasana',
    },
  },
  en: {
    AcceptInvitationScene: {
      button: 'Save',
      title: 'Setup your password',
      subTitle: 'Setup your password and start using application.',
      password: 'Password',
    },
  },
};

export default AcceptInvitationSceneTranslation;
