import React from 'react';
import { Link } from 'react-router-dom';
import CenterContent from '../CenterContent/CenterContent';
import Card from '../Card/Card';
import CardTitle from '../CardTitle/CardTitle';
import { AuthLayoutProps } from '../../typings';

const AuthLayout = (props: AuthLayoutProps) => {
  const {
    context, title, subTitle, children, links, message,
  } = props;
  return (
    <CenterContent>
      <div className="col-lg-6" id={context}>
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

export default AuthLayout;
