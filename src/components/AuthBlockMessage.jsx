import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CenterContent from './CenterContent';
import CardTitle from './CardTitle';
import Card from './Card';

const AuthBlockMessage = ({ message, backToLoginText }) => (
  <CenterContent>
    <div className="col-6 text-center">
      <Card>
        <CardTitle>{message}</CardTitle>
        <Link to="/login">{backToLoginText}</Link>
      </Card>
    </div>
  </CenterContent>
);

AuthBlockMessage.propTypes = {
  message: PropTypes.string.isRequired,
  backToLoginText: PropTypes.string,
};

AuthBlockMessage.defaultProps = {
  backToLoginText: 'Back to login',
};

export default AuthBlockMessage;
