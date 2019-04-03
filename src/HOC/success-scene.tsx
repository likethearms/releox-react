import React from 'react';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import { ct, ReleoxLocale } from '../I18N';

export interface ForgotSuccessSceneProps {
  locale?: ReleoxLocale;
}

export default
  (context: string, translationPrefix: string, linkUrl: string, getText?: () => string) =>
    ({ locale }: ForgotSuccessSceneProps) => {
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
