import React from 'react';
import { Link } from 'react-router-dom';
import CenterContent from '../CenterContent/CenterContent';
import Card from '../Card/Card';
import CardTitle from '../CardTitle/CardTitle';
import { AuthLayoutProps } from '../../typings';

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
