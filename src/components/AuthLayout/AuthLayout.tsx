import React from 'react';
import { Link } from 'react-router-dom';
import CenterContent from '../CenterContent/CenterContent';
import Card from '../Card/Card';
import CardTitle from '../CardTitle/CardTitle';

export interface AuthLayoutLinkItem {
  to: string;
  id: string;
  text: string;
}

interface AuthLayoutProps {
  context: string;
  title: string;
  subTitle: string;
  message: string;
  children: JSX.Element | JSX.Element[] | string;
  links: AuthLayoutLinkItem[];
}

const AuthLayout = (props: AuthLayoutProps) => (
  <CenterContent>
    <div className="col-6" id={props.context}>
      <Card>
        <div>
          <CardTitle>{props.title}</CardTitle>
          <p className="text-muted">{props.subTitle}</p>
          {props.children}
          {props.links.map(l => (
            <Link to={l.to} key={l.to} id={`${props.context}-${l.id}`}>
              {l.text}
            </Link>
          ))}
          <div className="text-center">{props.message}</div>
        </div>
      </Card>
    </div>
  </CenterContent>
);

export default AuthLayout;
