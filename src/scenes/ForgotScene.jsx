import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import getErrorMessage from '../utils/get-error-message';
import AuthLayout from '../components/AuthLayout';
import InputInlineGroup from '../components/InputInlineGroup';

class ForgotScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showThanksPage: false,
      email: '',
      errorMessage: '',
    };
  }

  onSubmit(e) {
    const { email } = this.state;
    const { passwordResetAPIUrl, emailRedirectUrl } = this.props;
    e.preventDefault();
    axios
      .post(passwordResetAPIUrl, { email, redirectUrl: emailRedirectUrl })
      .then(this.onSuccessRequest.bind(this))
      .catch();
  }

  onSuccessRequest() {
    this.setState({ showThanksPage: true });
  }

  onInputChange(e) {
    this.setState({ email: e.target.value });
  }

  onCatchError(error) {
    this.setState({ errorMessage: getErrorMessage(error) });
  }

  getResetButtonText() {
    return this.props.resetButtonText;
  }

  getBackText() {
    return this.props.backText;
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

  getThankYouTitle() {
    return this.props.thankYouTitle;
  }

  getThankYouSubTitle() {
    return this.props.thankYouSubTitle;
  }

  getThankYouBackText() {
    return this.props.thankYouBackText;
  }

  render() {
    const {
      thankYouLink, tokenLocalStorageKey, authorizedRedirectUrl, backUrl,
    } = this.props;
    const { email, errorMessage, showThanksPage } = this.state;
    let page;
    if (showThanksPage) {
      page = (
        <div className="text-center">
          <h1>{this.getThankYouTitle()}</h1>
          <p className="text-muted">{this.getThankYouSubTitle()}</p>
          <NavLink className="btn btn-link px-0" to={thankYouLink || backUrl}>{this.getThankYouBackText()}</NavLink>
        </div>
      );
    } else {
      page = (
        <form onSubmit={this.onSubmit.bind(this)}>
          <h1>{this.getTitle()}</h1>
          <p className="text-muted">{this.getSubTitle()}</p>
          <InputInlineGroup
            value={email}
            label="fa fa-user"
            placeholder={this.getPlaceholder()}
            name="email"
            type="email"
            onChange={this.onInputChange.bind(this)}
          />
          <div className="row">
            <div className="col-6">
              <NavLink className="btn btn-link px-0" to={backUrl}>{this.getBackText()}</NavLink>
            </div>
            <div className="col-6 text-right">
              <button type="submit" className="btn btn-primary px-4">{this.getResetButtonText()}</button>
            </div>
          </div>
          {errorMessage ? (
            <div className="row">
              <div className="col-md-12">
                <p className="text-muted text-center mt-4">{errorMessage}</p>
              </div>
            </div>
          ) : undefined}
        </form>
      );
    }
    return (
      <AuthLayout
        tokenLocalStorageKey={tokenLocalStorageKey}
        authorizedRedirectUrl={authorizedRedirectUrl}
      >
        {page}
      </AuthLayout>
    );
  }
}

ForgotScene.propTypes = {
  passwordResetAPIUrl: PropTypes.string,
  backUrl: PropTypes.string,
  emailRedirectUrl: PropTypes.string,
  resetButtonText: PropTypes.string,
  backText: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  placeholder: PropTypes.string,
  thankYouTitle: PropTypes.string,
  thankYouSubTitle: PropTypes.string,
  thankYouBackText: PropTypes.string,
  thankYouLink: PropTypes.string,
  tokenLocalStorageKey: PropTypes.string,
  authorizedRedirectUrl: PropTypes.string,
};

ForgotScene.defaultProps = {
  tokenLocalStorageKey: window.TOKEN_LOCAL_STORAGE_KEY,
  backUrl: '/login',
  passwordResetAPIUrl: `${window.API_ENDPOINT}/Members/reset`,
  emailRedirectUrl: `${window.location.origin}/forgot`,
  resetButtonText: 'Reset',
  backText: 'Back to login',
  title: 'Reset your password',
  subTitle: 'Please write your email and we send you password reset link.',
  placeholder: 'Email',
  thankYouTitle: 'Thank you!',
  thankYouSubTitle: 'Reset link is sent to your email!',
  thankYouBackText: 'Back to login',
  thankYouLink: '',
  authorizedRedirectUrl: '/',
};

export default ForgotScene;
