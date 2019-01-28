interface IAuthRoutes {
  path: string;
  component: JSX.Element,
}

declare module 'releox-react' {
  export class AcceptInvitation { };
  export class ForgotScene { };
  export class LoginScene { };
  export class ResetPasswordScene { };
  export const authRoutes: IAuthRoutes[];
};
