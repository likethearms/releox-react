/* tslint:disable:max-line-length  */

interface TranslationObject {
  [key: string]: string;
  // Login
  'login.title': string;
  'login.subTitle': string;
  'login.emailPlaceholder': string;
  'login.passwordPlaceholder': string;
  'login.forgotPasswordText': string;
  'login.registerText': string;
  'login.loginButtonText': string;

  // Forgot
  'forgot.title': string;
  'forgot.buttonText': string;
  'forgot.linkText': string;
  'forgot.subTitle': string;
  'forgot.placeholder': string;

  // ForgotSuccess
  'forgotSuccess.title': string;
  'forgotSuccess.link': string;
  'forgotSuccess.subTitle': string;

  // ResetPassword
  'resetPassword.title': string;
  'resetPassword.subTitle': string;
  'resetPassword.placeholder': string;
  'resetPassword.buttonText': string;

  // ResetPasswordSuccess
  'resetPasswordSuccess.title': string;
  'resetPasswordSuccess.link': string;
  'resetPasswordSuccess.subTitle': string;

  // AuthError
  'authError.title': string;
  'authError.link': string;
  'authError.subTitle': string;

  // Confirm
  'confirm.title': string;
  'confirm.link': string;
  'confirm.subTitle': string;

  // Accept Invitation
  'acceptInvitation.buttonText': string;
  'acceptInvitation.title': string;
  'acceptInvitation.subTitle': string;
  'acceptInvitation.placeholder': string;

  // Accept Invitation Success
  'acceptInvitationSuccess.title': string;
  'acceptInvitationSuccess.link': string;
  'acceptInvitationSuccess.subTitle': string;
}

interface Translation<T> {
  [key: string]: T;
}

const translations: Translation<TranslationObject> = {
  fi: {
    // Login
    'login.title': 'Kirjaudu',
    'login.subTitle': 'Täytä tiedot ja kirjaudu sisään',
    'login.emailPlaceholder': 'Sähköposti',
    'login.passwordPlaceholder': 'Salasana',
    'login.forgotPasswordText': 'Unohditko salasanasi?',
    'login.registerText': 'Oletko uusi? Luo tunnus!',
    'login.loginButtonText': 'Kirjaudu',

    // Forgot
    'forgot.buttonText': 'Nollaa',
    'forgot.linkText': 'Takaisin kirjautumissivulle',
    'forgot.title': 'Nolla salasana',
    'forgot.subTitle': 'Kirjoita sähköpostiosoitteesi niin lähetämme sinulle linkin jolla voit vaihtaa salasanasi.',
    'forgot.placeholder': 'Sähköposti',

    // ForgotSuccess
    'forgotSuccess.title': 'Salasannan nollaus pyyntö lähetetty!',
    'forgotSuccess.link': 'Kirjautumissivulle',
    'forgotSuccess.subTitle': 'Salasanan nollaus linkki on lähetetty sähköpostiisi! Avaa sähköpostissa oleva linkki ja vaihda salasana.',

    // ResetPassword
    'resetPassword.title': 'Aseta uusi salasana',
    'resetPassword.subTitle': 'Kirjoita uusi salasana ja paina tallenna',
    'resetPassword.placeholder': 'Salasana',
    'resetPassword.buttonText': 'Tallenna',

    // ResetPasswordSuccess
    'resetPasswordSuccess.title': 'Salasanasi on vaihdettu',
    'resetPasswordSuccess.link': 'Kirjautumissivulle',
    'resetPasswordSuccess.subTitle': 'Salasanasi on vaihdettu onnistuneesti. Voit nyt palata kirjautumissivulle ja kirjautua uudella salasanalla',

    // AuthError
    'authError.title': 'Oops... Tapahtui virhe',
    'authError.link': 'Kirjautumissivulle',
    'authError.subTitle': 'Emme kyenneet löytämään virheen syytä.',

    // Confirm
    'confirm.title': 'Tunnuksesi on nyt aktivoitu',
    'confirm.link': 'Takaisin',
    'confirm.subTitle': 'Tunnuksesi on nyt aktivoitu. Voit jatkaa ohjelman käyttöä',

    // Accept Invitation
    'acceptInvitation.buttonText': 'Tallenna',
    'acceptInvitation.title': 'Viimeistele tunnuksesi',
    'acceptInvitation.subTitle': 'Anna salasanasi niin pääset kirjautumaan.',
    'acceptInvitation.placeholder': 'Salasana',

    // Accept Invitation Success
    'acceptInvitationSuccess.title': 'Salasanasi on tallennettu',
    'acceptInvitationSuccess.link': 'Takaisin',
    'acceptInvitationSuccess.subTitle': 'Tunnuksesi on valmis. Voit nyt kirjautua ohjelmaan.',
  },
  en: {
    // Login
    'login.title': 'Login',
    'login.subTitle': 'Fill form and login',
    'login.emailPlaceholder': 'Email',
    'login.passwordPlaceholder': 'Password',
    'login.forgotPasswordText': 'Forgot password?',
    'login.registerText': 'New? Create new account!',
    'login.loginButtonText': 'Login',

    // Forgot
    'forgot.buttonText': 'Reset',
    'forgot.linkText': 'Back to login',
    'forgot.title': 'Reset your password',
    'forgot.subTitle': 'Please write your email and we send you password reset link.',
    'forgot.placeholder': 'Email',

    // ForgotSuccess
    'forgotSuccess.title': 'Reset email is sent!',
    'forgotSuccess.link': 'Back to login',
    'forgotSuccess.subTitle': 'Password reset link is sent to your email. Click link on your email and change password.',

    // ResetPassword
    'resetPassword.title': 'Set new password',
    'resetPassword.subTitle': 'Write new password and click save!',
    'resetPassword.placeholder': 'Password',
    'resetPassword.buttonText': 'Save',

    // ResetPasswordSuccess
    'resetPasswordSuccess.title': 'You password is changed',
    'resetPasswordSuccess.link': 'Back to login',
    'resetPasswordSuccess.subTitle': 'Your password is now changed. Go back to login page and log in with new password.',

    // AuthError
    'authError.title': 'Oops... There was an error',
    'authError.link': 'Back to login',
    'authError.subTitle': 'We couldn\'t find reason for an error.',

    // Confirm
    'confirm.title': 'You account is now activated.',
    'confirm.link': 'Back',
    'confirm.subTitle': 'You account is now activated. You can now continue using application.',

    // Accept Invitation
    'acceptInvitation.buttonText': 'Save',
    'acceptInvitation.title': 'Setup your password',
    'acceptInvitation.subTitle': 'Setup your password and start using application.',
    'acceptInvitation.placeholder': 'Password',

    // Accept Invitation Success
    'acceptInvitationSuccess.title': 'You password is saved',
    'acceptInvitationSuccess.link': 'To Login',
    'acceptInvitationSuccess.subTitle': 'You password is saved. You can now login.',
  },
};

export default translations;
