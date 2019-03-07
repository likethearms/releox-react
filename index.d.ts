interface IAuthRoutes {
  path: string;
  component: JSX.Element,
}

interface IAcceptInvitationProps {
  redirectUrl?: string;
  skipValidation?: boolean;
  title?: string;
  subTitle?: string;
  placeholder?: string;
  buttonText?: string;
  validateTokenUrl?: string;
  updateUrl?: string;
  removeAccessTokenUrl?: string;
}

interface IForgotSceneProps {
  passwordResetAPIUrl?: string;
  backUrl?: string;
  emailRedirectUrl?: string;
  buttonText?: string;
  backText?: string;
  title?: string;
  subTitle?: string;
  placeholder?: string;
  thankYouTitle?: string;
  thankYouSubTitle?: string;
  thankYouBackText?: string;
  thankYouLink?: string;
}

interface ILoginSceneProps {
  title?: string;
  subTitle?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  forgotPasswordText?: string;
  loginButtonText?: string;
  registerText?: string;
  registerUrl?: string;
  redirectUrl?: string;
  forgotPasswordUrl?: string;
  preSetEmail?: string;
  preSetPassword?: string;
  loginRequestUrl?: string;
  tokenLocalStorageKey?: string;
}

interface IResetPasswordSceneProps {
  title?: string;
  subTitle?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  forgotPasswordText?: string;
  locale?: string;
  loginButtonText?: string;
  registerText?: string;
  registerUrl?: string;
  redirectUrl?: string;
  forgotPasswordUrl?: string;
  preSetEmail?: string;
  preSetPassword?: string;
  loginRequestUrl?: string;
  tokenLocalStorageKey?: string;
}

declare module 'releox-react' {
  export class AcceptInvitation extends React.Component<IAcceptInvitationProps, any> { }
  export class ForgotScene extends React.Component<IForgotSceneProps, any> { }
  export class LoginScene extends React.Component<ILoginSceneProps, any> { }
  export class ResetPasswordScene extends React.Component<IResetPasswordSceneProps, any> { }
  export const authRoutes: IAuthRoutes[];
}
