import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import queryString from 'query-string';
import Loading from '../components/Loading';
import AuthBlockMessage from '../components/AuthBlockMessage';
import getErrorMessage from '../utils/get-error-message';

const translate = {
  fi: {
    message: 'Tunnuksesi on nyt aktivoitu.',
    backToLoginText: 'Takaisin kirjautumissivulle',
  },
  en: {
    message: 'You account is now activated.',
    backToLoginText: undefined,
  },
};

class ConfirmScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentWillMount() {
    const query = queryString.parse(window.location.search);
    Axios.get(`${this.getConfirmUrl()}?uid=${query.uid}&invitation_token=${query.token}`)
      .then(() => this.setState({ loading: false }))
      .catch(e => this.onCatchError(e));
  }

  onCatchError(error) {
    this.setState({ error: getErrorMessage(error), loading: false });
  }

  getConfirmUrl() {
    return this.props.confirmUrl;
  }

  getMessage() {
    const { locale } = this.props;
    return this.props.message || translate[locale].message;
  }

  getBackToLoginText() {
    const { locale } = this.props;
    return this.props.backToLoginText || translate[locale].backToLoginText;
  }

  render() {
    const { loading, error } = this.state;
    if (loading) return <Loading centeredVertical />;
    return (
      <AuthBlockMessage
        message={error || this.getMessage()}
        backToLoginText={this.getBackToLoginText()}
      />
    );
  }
}

ConfirmScene.propTypes = {
  confirmUrl: PropTypes.string,
  locale: PropTypes.string,
  message: PropTypes.string,
  backToLoginText: PropTypes.string,
};

ConfirmScene.defaultProps = {
  confirmUrl: `${window.API_ENDPOINT}/Members/confirm`,
  locale: 'fi',
  backToLoginText: undefined,
  message: undefined,
};

export default ConfirmScene;
