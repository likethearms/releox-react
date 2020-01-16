import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CenterContent } from '../CenterContent/CenterContent';
import { Card } from '../Card/Card';
import { CardTitle } from '../CardTitle/CardTitle';

export interface AuthLayoutLinkItem {
  to: string;
  id: string;
  text: string;
}

export interface AuthLayoutProps {
  context: string;
  message?: string;
  subTitle?: string;
  title?: string;
  children?: JSX.Element | JSX.Element[] | string;
  links: AuthLayoutLinkItem[];
  titleBlock?: string | JSX.Element;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { context, children, links, message, titleBlock, subTitle } = props;
  const { t } = useTranslation(context);
  return (
    <CenterContent>
      <div className="col-lg-6 AuthLayout" id={context}>
        {titleBlock}
        <Card>
          <>
            <CardTitle>{t('title')}</CardTitle>
            <p className="text-muted">{subTitle || t('subTitle')}</p>
            {children}
            {links.map((l) => (
              <Link to={l.to} key={l.to} id={`${context}-${l.id}`}>
                {l.text}
              </Link>
            ))}
            <div className="text-center">{message}</div>
          </>
        </Card>
      </div>
    </CenterContent>
  );
};
