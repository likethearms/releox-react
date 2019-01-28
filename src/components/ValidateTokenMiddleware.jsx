import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class ValidateTokenMiddleware extends Component {
  componentWillMount() {
    const {
      validateTokenUrl, skipValidation, accessToken, user,
    } = this.props;
    this.onRequest();
    if (skipValidation) {
      this.onSuccess({ invitationDone: false });
    } else {
      axios
        .get(`${validateTokenUrl}/${user}?access_token=${accessToken}`)
        .then(r => this.onSuccess(r.data))
        .catch(this.onFail.bind(this));
    }
  }

  onRequest() {
    return this.props.onRequest();
  }

  onSuccess(user) {
    return this.props.onSuccess(user);
  }

  onFail(e) {
    return this.props.onFail(e);
  }

  render() {
    return this.props.children;
  }
}

ValidateTokenMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
  onSuccess: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  onFail: PropTypes.func.isRequired,
  onRequest: PropTypes.func,
  skipValidation: PropTypes.bool,
  validateTokenUrl: PropTypes.string,
};

ValidateTokenMiddleware.defaultProps = {
  validateTokenUrl: `${window.API_ENDPOINT}/Members`,
  onRequest: () => { },
  skipValidation: false,
};

export default ValidateTokenMiddleware;
