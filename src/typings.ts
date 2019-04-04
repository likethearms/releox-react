import { Component } from 'react';
import { Route } from 'react-router';
import { LoadingProps as LP, LoadingType } from 'react-loading';

export enum ReleoxLocale {
  FI = 'fi',
  EN = 'en',
}

export interface ReleoxOptions {
  showRegisterLink: boolean;
}

interface CoreuiSidebarMenuBase {
  type?: string;
  text: string;
  url: string;
  icon?: string;
  onClick?: () => void;
  exact?: boolean;
}

export interface CoreuiSidebarProps {
  menu: CoreuiSidebarMenu[];
}

export interface CoreuiSidebarMenu extends CoreuiSidebarMenuBase {
  children?: CoreuiSidebarMenuBase[];
}

export interface CoreuiLayoutProps {
  children: JSX.Element | string;
  sidebarMenu: CoreuiSidebarMenu[];
  menuTitle: string;
  brand: JSX.Element | string;
  brandUrl?: string;
}

export interface LoginBody {
  password: string;
  email: string;
}

export interface LoginSceneProps {
  onSubmit?: (body: LoginBody) => void;
  onError?: (err: Error) => void;
  locale?: ReleoxLocale;
}

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' |
  'warning' | 'info' | 'light' | 'dark' | 'link';
export type ButtonType = 'submit' | 'button';

export interface ButtonProps {
  id: string;
  type?: ButtonType;
  onClick?: () => any;
  className?: string;
  children: string;
  color?: ButtonColor;
}

export interface CardProps {
  children: JSX.Element[] | string[] | string | JSX.Element;
}

export interface CardTitleProps {
  children: string | JSX.Element;
  lg?: boolean;
  xl?: boolean;
}

export interface CenterContentProps {
  children: JSX.Element | string;
}

export interface FormikFormWrapperProps<R> {
  onSubmit(data: R): void;
  initialValues: R;
  children: JSX.Element;
}

export type InputTypes = 'text' | 'email' | 'password';

export interface InputProps extends AbstractInputGroupProps {
  type?: InputTypes;
  placeholder?: string;
  className?: string;
}

export interface AbstractInputGroupProps {
  label: string;
  name: string;
  id?: string;
}

export interface LoadingProps extends LP {
  centeredVertical: boolean;
  color?: string;
  type?: LoadingType;
}

export interface ReleoxRoutes {
  component: any;
  url: string;
}

export interface AuthLayoutLinkItem {
  to: string;
  id: string;
  text: string;
}

export interface AuthLayoutProps {
  context: string;
  title: string;
  subTitle: string;
  message?: string;
  children?: JSX.Element | JSX.Element[] | string;
  links: AuthLayoutLinkItem[];
}

export class AuthLayout extends Component<AuthLayoutProps> { }
export class LoginScene extends Component<LoginSceneProps> { }
export class CoreuiLayout extends Component<CoreuiLayoutProps> { }
export class Button extends Component<ButtonProps> { }
export class Card extends Component<CardProps> { }
export class CardTitle extends Component<CardTitleProps> { }
export class CenterContent extends Component<CenterContentProps> { }
export class FormikFormWrapper<R> extends Component<FormikFormWrapperProps<R>> { }
export class Input extends Component<InputProps> { }
export class Loading extends Component<LoadingProps> { }
