import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from './AuthLayout/AuthLayout';
import { routes } from '../routes';

export interface SuccessSceneProps {
  context: string;
  subTitle?: string;
}

export const SuccessScene = ({ context, subTitle }: SuccessSceneProps) => {
  const { t } = useTranslation(context);
  return (
    <AuthLayout
      title={t('title')}
      subTitle={subTitle || t('subTitle')}
      context={context}
      links={[
        {
          to: routes.LOGIN,
          id: 'login-link',
          text: t('toLogin'),
        },
      ]}
    />
  );
};
