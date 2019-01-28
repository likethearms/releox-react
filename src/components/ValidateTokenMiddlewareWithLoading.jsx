import React from 'react';
import PropTypes from 'prop-types';
import ValidateTokenMiddleware from './ValidateTokenMiddleware';
import Loading from './Loading';


const ValidateTokenMiddlewareWithLoading = (props) => {
  const {
    accessToken, user, skipValidation, validateTokenUrl, onSuccess, onFail, onRequest,
  } = props;
  return (
    <ValidateTokenMiddleware
      accessToken={accessToken}
      user={user}
      skipValidation={skipValidation}
      validateTokenUrl={validateTokenUrl}
      onRequest={onRequest}
      onSuccess={onSuccess}
      onFail={onFail}
    >
      <Loading centeredVertical />
    </ValidateTokenMiddleware>
  );
};

ValidateTokenMiddlewareWithLoading.propTypes = {
  accessToken: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  skipValidation: PropTypes.bool,
  validateTokenUrl: PropTypes.string,
  onRequest: PropTypes.func,
};

ValidateTokenMiddlewareWithLoading.defaultProps = {
  validateTokenUrl: undefined,
  onRequest: undefined,
  skipValidation: undefined,
};

export default ValidateTokenMiddlewareWithLoading;
