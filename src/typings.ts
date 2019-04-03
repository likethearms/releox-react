import { Component } from 'react';
import { Route } from 'react-router';
import { LoadingProps as LP, LoadingType } from 'react-loading';

export enum ReleoxLocale {
  FI = 'fi',
  EN = 'en',
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
  showRegisterLink?: boolean;
  locale?: ReleoxLocale;
}

export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
  LINK = 'link',
}

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

export interface ButtonProps {
  id: string;
  type?: ButtonType;
  className?: string;
  children: string;
  color?: ButtonColor;
}

export interface CardProps {
  children: JSX.Element[] | string[]| string | JSX.Element;
}

export interface CardTitleProps {
  children: string | JSX.Element;
}

export interface CenterContentProps {
  children: JSX.Element | string;
}

export interface FormikFormWrapperProps<R> {
  onSubmit(data: R): void;
  initialValues: R;
  children: JSX.Element;
}

export enum InputTypes {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface InputProps extends AbstractInputGroupProps {
  type?: InputTypes;
  placeholder?: string;
  className?: string;
}

export interface AbstractInputGroupProps {
  label: string;
  name: string;
  id: string;
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

export class LoginScene extends Component<LoginSceneProps> { }
export class CoreuiLayout extends Component<CoreuiLayoutProps> { }
export class Button extends Component<ButtonProps> { }
export class Card extends Component<CardProps> { }
export class CardTitle extends Component<CardTitleProps> { }
export class CenterContent extends Component<CenterContentProps> { }
export class FormikFormWrapper<R> extends Component<FormikFormWrapperProps<R>> { }
export class Input extends Component<InputProps> { }
export class Loading extends Component<LoadingProps> { }
