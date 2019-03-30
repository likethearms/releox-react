import React from 'react';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import { ct, ReleoxLocale } from '../I18N';

export interface ForgotSuccessSceneProps {
  locale?: ReleoxLocale;
}

export default (context: string, translationPrefix: string, linkUrl: string) =>
  ({ locale }: ForgotSuccessSceneProps) => {
    const t = ct(translationPrefix, locale);
    return (
      <AuthLayout
        title={t('title')}
        subTitle={t('subTitle')}
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
