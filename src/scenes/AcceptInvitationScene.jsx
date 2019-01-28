import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import ValidateTokenMiddlewareWithLoading from '../components/ValidateTokenMiddlewareWithLoading';
import AuthLayout from '../components/AuthLayout';
import Loading from '../components/Loading';
import getErrorMessage from '../utils/get-error-message';
import OneInputActionForm from '../components/OneInputActionForm';
import AuthBlockMessage from '../components/AuthBlockMessage';

class AcceptInvitation extends Component {
  static checkInvitationIsNotDone(user) {
    if (user.invitationDone) return Promise.reject(new Error('Account already is ready to use.'));
    return Promise.resolve(user);
  }

  constructor(props) {
    super(props);
    let query = {};
    query = queryString.parse(window.location.search);
    this.state = {
      query,
      password: '',
      accessDenied: '',
      loading: false,
      isValidating: true,
      redirect: false,
      message: '',
    };
  }

  onInputChange(e) {
    this.setState({ password: e.target.value });
  }

  onCatchError(e, accessDenied) {
    if (accessDenied) {
      this.setState({ isValidating: false, accessDenied: getErrorMessage(e), loading: false });
    } else {
      this.setState({ isValidating: false, message: getErrorMessage(e), loading: false });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.updatePassword()
      .then(() => this.removeToken())
      .then(() => this.setState({ redirect: true }))
      .catch(this.onCatchError.bind(this));
  }

  onSuccessValidation(user) {
    AcceptInvitation.checkInvitationIsNotDone(user)
      .then(() => this.setState({ isValidating: false }))
      .catch(e => this.onCatchError(e, true));
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
    const { updateUrl } = this.props;
    return axios.patch(`${updateUrl}/${query.user}?access_token=${query.access_token}`, {
      password,
      emailVerified: true,
      invitationDone: true,
    });
  }

  removeToken() {
    const { removeAccessTokenUrl } = this.props;
    const { query } = this.state;
    const opt = { params: { access_token: query.access_token } };
    return axios.post(removeAccessTokenUrl, undefined, opt);
  }

  render() {
    const {
      password, message, loading, redirect, accessDenied, isValidating, query,
    } = this.state;
    const { redirectUrl, skipValidation, validateTokenUrl } = this.props;
    if (redirect) return <Redirect to={redirectUrl} />;
    if (isValidating) {
      return (
        <ValidateTokenMiddlewareWithLoading
          accessToken={query.access_token}
          user={query.user || query.userId}
          skipValidation={skipValidation}
          validateTokenUrl={validateTokenUrl}
          onSuccess={user => this.onSuccessValidation(user)}
          onFail={e => this.onCatchError(e, true)}
        />
      );
    }
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
  updateUrl: PropTypes.string,
  removeAccessTokenUrl: PropTypes.string,
};

AcceptInvitation.defaultProps = {
  redirectUrl: '/login',
  updateUrl: `${window.API_ENDPOINT}/Members`,
  validateTokenUrl: undefined,
  removeAccessTokenUrl: `${window.API_ENDPOINT}/Members/logout`,
  title: 'Accept invitation',
  skipValidation: false,
  subTitle: 'Finnish your account and login!',
  placeholder: 'Password',
  buttonText: 'Save',
};

export default AcceptInvitation;
