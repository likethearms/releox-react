import React from 'react';
import { ct, ReleoxLocale } from '../I18N';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';

export interface SuccessSceneProps {
  locale?: ReleoxLocale;
}

export const successScene = (
  context: string,
  translationPrefix: string,
  linkUrl: string,
  getText?: () => string,
) => ({ locale }: SuccessSceneProps) => {
  const t = ct(translationPrefix, locale);
  const callText = getText as Function;
  return (
    <AuthLayout
      title={t('title')}
      subTitle={callText ? callText() : t('subTitle')}
      context={context}
      links={[
        {
          to: linkUrl,
          id: 'login-link',
          text: t('link'),
        },
      ]}
    />
  );
};
