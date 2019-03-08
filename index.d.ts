interface IAuthRoutes {
  path: string;
  component: JSX.Element | Function;
}

interface IAcceptInvitationProps {
  redirectUrl?: string;
  skipValidation?: boolean;
  title?: string;
  subTitle?: string;
  locale?: string;
  placeholder?: string;
  buttonText?: string;
  validateTokenUrl?: string;
  updateUrl?: string;
  removeAccessTokenUrl?: string;
}

interface IForgotSceneProps {
  passwordResetAPIUrl?: string;
  backUrl?: string;
  locale?: string;
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
  locale?: string;
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

interface LoadingProps {
  centeredVertical?: boolean;
}

interface CardProps {
  children: JSX.Element;
}

interface ConfirmSceneProps {
  confirmUrl?: string,
  locale?: string,
  message?: string,
  backToLoginText?: string,
}

interface CardLinkProps {
  linkString: string;
}

interface CardTitleProps {
  children: JSX.Element;
}

interface CenterContentProps {
  children: JSX.Element;
}

declare module 'releox-react' {
  export class AcceptInvitation extends React.Component<IAcceptInvitationProps> { }
  export class ForgotScene extends React.Component<IForgotSceneProps> { }
  export class LoginScene extends React.Component<ILoginSceneProps> { }
  export class ResetPasswordScene extends React.Component<IResetPasswordSceneProps> { }
  export class Loading extends React.Component<LoadingProps> { }
  export class Card extends React.Component<CardProps> { }
  export class ConfirmScene extends React.Component<ConfirmSceneProps> { }
  export class CardLink extends React.Component<CardLinkProps> { }
  export class CardTitle extends React.Component<CardTitleProps> { }
  export class CenterContent extends React.Component<CenterContentProps> { }
  export const authRoutes: IAuthRoutes[];
}
