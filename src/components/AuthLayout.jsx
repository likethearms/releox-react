import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CenterContent from './CenterContent';

const AuthLayout = ({ children }) => (
  <CenterContent>
    <div className="col-md-5">
      <Card>
        {children}
      </Card>
    </div>
  </CenterContent>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
