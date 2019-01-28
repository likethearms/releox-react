import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CenterContent from './CenterContent';
import CardTitle from './CardTitle';
import Card from './Card';

const AuthBlockMessage = ({ message }) => (
  <CenterContent>
    <div className="col-6 text-center">
      <Card>
        <CardTitle>{message}</CardTitle>
        <Link to="/login">Back to login</Link>
      </Card>
    </div>
  </CenterContent>
);

AuthBlockMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AuthBlockMessage;
