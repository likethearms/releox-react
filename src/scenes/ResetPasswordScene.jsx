import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import AuthLayout from '../components/AuthLayout';
import getErrorMessage from '../utils/get-error-message';
import OneInputActionForm from '../components/OneInputActionForm';
import AuthBlockMessage from '../components/AuthBlockMessage';
import ValidateTokenMiddlewareWithLoading from '../components/ValidateTokenMiddlewareWithLoading';
import Loading from '../components/Loading';

class ResetPasswordScene extends Component {
  constructor(props) {
    super(props);
    let query = {};
    query = queryString.parse(window.location.search);
    this.state = {
      loading: false,
      isValidating: true,
      redirect: false,
      query,
      password: '',
      message: '',
      blockMessage: '',
    };
  }

  onInputChange(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.resetRequest()
      .then(() => this.removeAccessToken())
      .then(() => this.setState({ redirect: true }))
      .catch(this.onCatchError.bind(this));
  }

  onCatchError(error, isBlockMessage) {
    if (isBlockMessage) {
      return this.setState({
        blockMessage: getErrorMessage(error),
        loading: false,
        isValidating: false,
      });
    }
    return this.setState({
      message: getErrorMessage(error),
      loading: false,
      isValidating: false,
    });
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

  resetRequest() {
    const { password, query: { access_token } } = this.state;
    const { updatePasswordAPIUrl } = this.props;
    const opt = { params: { access_token } };
    return axios.post(updatePasswordAPIUrl, { newPassword: password }, opt);
  }

  removeAccessToken() {
    const { query } = this.state;
    const { removeAccessTokenUrl } = this.props;
    const { access_token } = query;
    return axios.post(removeAccessTokenUrl, undefined, { params: { access_token } });
  }

  render() {
    const {
      password, isValidating, message, redirect, blockMessage, query, loading,
    } = this.state;
    const { redirectUrl, skipValidation, validateTokenUrl } = this.props;
    if (redirect) return (<Redirect to={redirectUrl} />);
    if (isValidating) {
      return (
        <ValidateTokenMiddlewareWithLoading
          accessToken={query.access_token}
          user={query.user || query.userId}
          skipValidation={skipValidation}
          validateTokenUrl={validateTokenUrl}
          onSuccess={() => this.setState({ isValidating: false })}
          onFail={e => this.onCatchError(e, true)}
        />
      );
    }
    if (loading) return <Loading centeredVertical />;
    if (blockMessage) return <AuthBlockMessage message={blockMessage} />;
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

ResetPasswordScene.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  updatePasswordAPIUrl: PropTypes.string,
  skipValidation: PropTypes.bool,
  removeAccessTokenUrl: PropTypes.string,
  validateTokenUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
};

ResetPasswordScene.defaultProps = {
  updatePasswordAPIUrl: `${window.API_ENDPOINT}/Members/reset-password`,
  validateTokenUrl: undefined,
  removeAccessTokenUrl: `${window.API_ENDPOINT}/Members/logout`,
  skipValidation: false,
  redirectUrl: '/login',
  title: 'Set new password',
  subTitle: 'Write new password and click save!',
  placeholder: 'Password',
  buttonText: 'Save',
};

export default ResetPasswordScene;
