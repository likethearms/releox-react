import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const AuthLayout = ({ children }) => (
  <div className="app flex-row align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <Card>
            {children}
          </Card>
        </div>
      </div>
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
