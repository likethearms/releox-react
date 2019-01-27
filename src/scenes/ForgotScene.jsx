import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import getErrorMessage from '../utils/get-error-message';
import AuthLayout from '../components/AuthLayout';
import OneInputActionForm from '../components/OneInputActionForm';
import CenterContent from '../components/CenterContent';
import Loading from '../components/Loading';

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

  getButtonText() {
    return this.props.buttonText;
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
    const { thankYouLink, backUrl } = this.props;
    const {
      email, errorMessage, showThanksPage, loading,
    } = this.state;
    let page;
    if (loading) return <CenterContent><Loading /></CenterContent>;
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
        <OneInputActionForm
          onSubmit={this.onSubmit.bind(this)}
          title={this.getTitle()}
          subTitle={this.getSubTitle()}
          value={email}
          label="fa fa-user"
          name="email"
          type="email"
          buttonText={this.getButtonText()}
          placeholder={this.getPlaceholder()}
          onChange={this.onInputChange.bind(this)}
          backUrl={backUrl}
          backText={this.getBackText()}
          message={errorMessage}
        />
      );
    }
    return (
      <AuthLayout>
        {page}
      </AuthLayout>
    );
  }
}

ForgotScene.propTypes = {
  passwordResetAPIUrl: PropTypes.string,
  backUrl: PropTypes.string,
  emailRedirectUrl: PropTypes.string,
  buttonText: PropTypes.string,
  backText: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  placeholder: PropTypes.string,
  thankYouTitle: PropTypes.string,
  thankYouSubTitle: PropTypes.string,
  thankYouBackText: PropTypes.string,
  thankYouLink: PropTypes.string,
};

ForgotScene.defaultProps = {
  backUrl: '/login',
  passwordResetAPIUrl: `${window.API_ENDPOINT}/Members/reset`,
  emailRedirectUrl: `${window.location.origin}/forgot`,
  buttonText: 'Reset',
  backText: 'Back to login',
  title: 'Reset your password',
  subTitle: 'Please write your email and we send you password reset link.',
  placeholder: 'Email',
  thankYouTitle: 'Thank you!',
  thankYouSubTitle: 'Reset link is sent to your email!',
  thankYouBackText: 'Back to login',
  thankYouLink: '',
};

export default ForgotScene;
