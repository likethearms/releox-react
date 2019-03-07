import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import AuthLayout from '../components/AuthLayout';
import Loading from '../components/Loading';
import getErrorMessage from '../utils/get-error-message';
import OneInputActionForm from '../components/OneInputActionForm';
import AuthBlockMessage from '../components/AuthBlockMessage';

const translation = {
  fi: {
    title: 'Hyväksy kutsu',
    subTitle: 'Viimeistele tunnuksesi antamalla salasana ja kirjaudu sisään!',
    placeholder: 'Salasana',
    buttonText: 'Tallenna',
  },
  en: {
    title: 'Accept invitation',
    subTitle: 'Finnish your account and login!',
    placeholder: 'Password',
    buttonText: 'Save',
  },
};

class AcceptInvitation extends Component {
  constructor(props) {
    super(props);
    let query = {};
    query = queryString.parse(window.location.search);
    this.state = {
      query,
      password: '',
      accessDenied: '',
      loading: true,
      redirect: false,
      message: '',
    };
  }

  componentWillMount() {
    const { query } = this.state;
    const { skipValidation } = this.props;
    if (skipValidation) {
      this.setState({ loading: false });
    } else {
      axios
        .get(`${this.getValidateTokenUrl()}?uid=${query.uid}&invitation_token=${query.invitation_token}`)
        .then(() => this.setState({ loading: false }))
        .catch(e => this.onCatchError(e, true));
    }
  }

  onInputChange(e) {
    this.setState({ password: e.target.value });
  }

  onCatchError(e, accessDenied) {
    if (accessDenied) {
      this.setState({ accessDenied: getErrorMessage(e), loading: false });
    } else {
      this.setState({ message: getErrorMessage(e), loading: false });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.updatePassword()
      .then(() => this.setState({ redirect: true }))
      .catch(this.onCatchError.bind(this));
  }

  getTranslation(key) {
    const { locale } = this.props;
    return this.props[key] || translation[locale][key];
  }

  getValidateTokenUrl() {
    return this.props.validateTokenUrl;
  }

  getTitle() {
    return this.getTranslation('title');
  }

  getSubTitle() {
    return this.getTranslation('subTitle');
  }

  getPlaceholder() {
    return this.getTranslation('placeholder');
  }

  getButtonText() {
    return this.getTranslation('buttonText');
  }

  updatePassword() {
    const { password, query } = this.state;
    const { acceptInvitationUrl } = this.props;
    return axios.post(`${acceptInvitationUrl}?invitation_token=${query.invitation_token}&uid=${query.uid}`, { password });
  }

  render() {
    const {
      password, message, loading, redirect, accessDenied,
    } = this.state;
    const { redirectUrl } = this.props;
    if (redirect) return <Redirect to={redirectUrl} />;
    if (loading) return <Loading centeredVertical />;
    if (accessDenied) return <AuthBlockMessage message={accessDenied} />;
    return (
      <AuthLayout>
        <OneInputActionForm
          onSubmit={this.onSubmit.bind(this)}
          title={this.getTitle()}
          subTitle={this.getSubTitle()}
          value={password}
          label="fa fa-lock"
          name="password"
          type="password"
          buttonText={this.getButtonText()}
          placeholder={this.getPlaceholder()}
          onChange={this.onInputChange.bind(this)}
          message={message}
        />
      </AuthLayout>
    );
  }
}

AcceptInvitation.propTypes = {
  redirectUrl: PropTypes.string,
  skipValidation: PropTypes.bool,
  locale: PropTypes.string,
  validateTokenUrl: PropTypes.string,
  title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  subTitle: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  placeholder: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  buttonText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  acceptInvitationUrl: PropTypes.string,
};

AcceptInvitation.defaultProps = {
  redirectUrl: '/login',
  locale: 'fi',
  acceptInvitationUrl: `${window.API_ENDPOINT}/Members/accept-invitation`,
  validateTokenUrl: `${window.API_ENDPOINT}/Members/validate-invitation-token`,
  skipValidation: false,
  title: undefined,
  subTitle: undefined,
  placeholder: undefined,
  buttonText: undefined,
};

export default AcceptInvitation;
