import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from './AuthLayout/AuthLayout';
import { routes } from '../routes';
import { getReleoxOption } from '../config';

export interface SuccessSceneProps {
  context: string;
  subTitle?: string;
}

export const SuccessScene = ({ context, subTitle }: SuccessSceneProps) => {
  const { t } = useTranslation(context);
  const mobileSupportOnly = getReleoxOption('mobileSupportOnly');
  const links = [];
  if (!mobileSupportOnly) {
    links.push({
      to: routes.LOGIN,
      id: 'login-link',
      text: t('toLogin'),
    });
  }
  return (
    <AuthLayout
      title={t('title')}
      subTitle={subTitle || t('subTitle')}
      context={context}
      links={links}
    />
  );
};
