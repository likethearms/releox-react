import React from 'react';
import { Link } from 'react-router-dom';
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
  title: string;
  subTitle: string;
  message?: string;
  children?: JSX.Element | JSX.Element[] | string;
  links: AuthLayoutLinkItem[];
  titleBlock?: string | JSX.Element;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { context, title, subTitle, children, links, message, titleBlock } = props;
  return (
    <CenterContent>
      <div className="col-lg-6" id={context}>
        {titleBlock}
        <Card>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-muted">{subTitle}</p>
            {children}
            {links.map((l) => (
              <Link to={l.to} key={l.to} id={`${context}-${l.id}`}>
                {l.text}
              </Link>
            ))}
            <div className="text-center">{message}</div>
          </div>
        </Card>
      </div>
    </CenterContent>
  );
};
