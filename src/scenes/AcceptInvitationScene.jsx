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
        .get(`${this.getValidateTokenUrl()}?uid=${query.invitation_token}&invitation_token=${query.uid}`)
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

  getValidateTokenUrl() {
    return this.props.validateTokenUrl;
  }

  getTitle() {
    return this.props.title;
  }

  getSubTitle() {
    return this.props.subTitle;
  }

  getPlaceholder() {
    return this.props.placeholder;
  }

  getButtonText() {
    return this.props.buttonText;
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
  title: PropTypes.string,
  subTitle: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  validateTokenUrl: PropTypes.string,
  acceptInvitationUrl: PropTypes.string,
};

AcceptInvitation.defaultProps = {
  redirectUrl: '/login',
  acceptInvitationUrl: `${window.API_ENDPOINT}/Members/accept-invitation`,
  validateTokenUrl: `${window.API_ENDPOINT}/Members/validate-invitation-token`,
  title: 'Accept invitation',
  skipValidation: false,
  subTitle: 'Finnish your account and login!',
  placeholder: 'Password',
  buttonText: 'Save',
};

export default AcceptInvitation;
