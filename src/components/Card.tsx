import React from 'react';

interface CardProps {
    children: JSX.Element | string;
}

const Card = ({ children }: CardProps) => (
    <div>{children}</div>
);

export default Card;