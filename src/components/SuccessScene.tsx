import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { getReleoxOption } from '../config';
import { routes } from '../routes';
import { AuthLayout } from './AuthLayout/AuthLayout';

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
    <>
      <Helmet>
        <title>{`${t('title')} | ${getReleoxOption('siteTitle')}`}</title>
      </Helmet>
      <AuthLayout
        title={t('title')}
        subTitle={subTitle || t('subTitle')}
        context={context}
        links={links}
      />
    </>
  );
};
