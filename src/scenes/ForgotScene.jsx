import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import getErrorMessage from '../utils/get-error-message';
import AuthLayout from '../components/AuthLayout';
import OneInputActionForm from '../components/OneInputActionForm';
import CenterContent from '../components/CenterContent';
import Loading from '../components/Loading';

const translation = {
  fi: {
    buttonText: 'Nollaa',
    backText: 'Takaisin kirjautumissivulle',
    title: 'Nolla salasana',
    subTitle: 'Kirjoita sähköpostiosoitteesi niin lähetämme sinulle linkin jolla voit vaihtaa salasanasi.',
    placeholder: 'Sähköposti',
    thankYouTitle: 'Kiitos!',
    thankYouSubTitle: 'Salasanan nollaus linkki on lähetetty sähköpostiisi!',
    thankYouBackText: 'Takaisin kirjautumissivulle',
  },
  en: {
    buttonText: 'Reset',
    backText: 'Back to login',
    title: 'Reset your password',
    subTitle: 'Please write your email and we send you password reset link.',
    placeholder: 'Email',
    thankYouTitle: 'Thank you!',
    thankYouSubTitle: 'Reset link is sent to your email!',
    thankYouBackText: 'Back to login',
  },
};

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

  getTranslation(key) {
    const { locale } = this.props;
    return this.props[key] || translation[locale][key];
  }

  getButtonText() {
    return this.getTranslation('buttonText');
  }

  getBackText() {
    return this.getTranslation('backText');
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

  getThankYouTitle() {
    return this.getTranslation('thankYouTitle');
  }

  getThankYouSubTitle() {
    return this.getTranslation('thankYouSubTitle');
  }

  getThankYouBackText() {
    return this.getTranslation('thankYouBackText');
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
  locale: PropTypes.string,
  emailRedirectUrl: PropTypes.string,
  thankYouLink: PropTypes.string,
  buttonText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  backText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  subTitle: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  placeholder: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  thankYouTitle: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  thankYouSubTitle: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  thankYouBackText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

ForgotScene.defaultProps = {
  locale: 'fi',
  backUrl: '/login',
  passwordResetAPIUrl: `${window.API_ENDPOINT}/Members/reset`,
  emailRedirectUrl: `${window.location.origin}/reset-password`,
  buttonText: undefined,
  backText: undefined,
  title: undefined,
  subTitle: undefined,
  placeholder: undefined,
  thankYouTitle: undefined,
  thankYouSubTitle: undefined,
  thankYouBackText: undefined,
  thankYouLink: undefined,
};

export default ForgotScene;
