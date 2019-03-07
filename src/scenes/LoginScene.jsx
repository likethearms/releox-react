import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import Axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import getErrorMessage from '../utils/get-error-message';
import InputInlineGroup from '../components/InputInlineGroup';
import Loading from '../components/Loading';
import CenterContent from '../components/CenterContent';
import CardTitle from '../components/CardTitle';

const translation = {
  fi: {
    title: 'Kirjaudu',
    subTitle: 'Täytä tiedot ja kirjaudu sisään',
    emailPlaceholder: 'Sähköposti',
    passwordPlaceholder: 'Salasana',
    forgotPasswordText: 'Unohditko salasanasi?',
    registerText: 'Oletko uusi? Luo tunnus!',
    loginButtonText: 'Kirjaudu',
  },
  en: {
    title: 'Login',
    subTitle: 'Fill form and login',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    forgotPasswordText: 'Forgot password?',
    registerText: 'New? Create new account!',
    loginButtonText: 'Login',
  },
};

class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: props.preSetEmail,
        password: props.preSetPassword,
      },
      message: '',
      loading: false,
      redirect: '',
    };
  }

  onInputChange(e) {
    const { value, name } = e.target;
    const { credentials } = this.state;
    credentials[name] = value;
    this.setState({ credentials });
  }

  onLogin(credentials, redirectUrl, tokenLocalStorageKey) {
    Axios.post(this.getLoginRequestUrl(), credentials)
      .then((r) => {
        localStorage.setItem(tokenLocalStorageKey, r.data.id);
        localStorage.setItem('userId', r.data.userId);
        this.setState({ redirect: redirectUrl });
      })
      .catch(this.onCatchError.bind(this));
  }

  onSubmit(e) {
    e.preventDefault();
    const { tokenLocalStorageKey, redirectUrl } = this.props;
    const { credentials } = this.state;
    this.setState({ loading: true });
    this.onLogin(credentials, redirectUrl, tokenLocalStorageKey);
  }

  onCatchError(error) {
    this.setState({ message: getErrorMessage(error), loading: false });
  }

  getTranslation(key) {
    const { locale } = this.props;
    return this.props[key] || translation[locale][key];
  }

  getLoginRequestUrl() {
    return this.props.loginRequestUrl;
  }

  getTitle() {
    return this.getTranslation('title');
  }

  getSubTitle() {
    return this.getTranslation('subTitle');
  }

  getEmailPlaceholder() {
    return this.getTranslation('emailPlaceholder');
  }

  getPasswordPlaceholder() {
    return this.getTranslation('passwordPlaceholder');
  }

  getForgotText() {
    return this.getTranslation('forgotPasswordText');
  }

  getLoginButtonText() {
    return this.getTranslation('loginButtonText');
  }

  getRegisterText() {
    return this.getTranslation('registerText');
  }

  getRegisterUrl() {
    return this.props.registerUrl;
  }

  getForgotPasswordUrl() {
    return this.props.forgotPasswordUrl;
  }

  render() {
    const {
      credentials, message, redirect, loading,
    } = this.state;
    const { email, password } = credentials;
    if (redirect) return <Redirect to={redirect} />;
    if (loading) return <CenterContent><Loading /></CenterContent>;
    return (
      <AuthLayout>
        <form onSubmit={this.onSubmit.bind(this)}>
          <CardTitle>{this.getTitle()}</CardTitle>
          <p className="text-muted">{this.getSubTitle()}</p>
          <InputInlineGroup
            value={email}
            label="fa fa-user"
            placeholder={this.getEmailPlaceholder()}
            name="email"
            type="email"
            onChange={this.onInputChange.bind(this)}
          />
          <InputInlineGroup
            value={password}
            label="fa fa-lock"
            placeholder={this.getPasswordPlaceholder()}
            name="password"
            type="password"
            onChange={this.onInputChange.bind(this)}
          />
          <div className="row">
            <div className="col-6">
              <NavLink className="btn btn-link px-0" to={this.getForgotPasswordUrl()} id="forgotPassowrdLink">{this.getForgotText()}</NavLink>
            </div>
            <div className="col-6 text-right">
              <button type="submit" className="btn btn-primary px-4" id="loginButton">{this.getLoginButtonText()}</button>
            </div>
          </div>
          {this.getRegisterUrl() ? (
            <div className="row">
              <div className="col-md-12">
                <NavLink className="btn btn-link text-center px-0 mt-2" to={this.getRegisterUrl()} id="registerLink">{this.getRegisterText()}</NavLink>
              </div>
            </div>
          ) : undefined}
          {message ? (
            <div className="row">
              <div className="col-md-12">
                <p className="text-muted text-center mt-4">{message}</p>
              </div>
            </div>
          ) : undefined}
        </form>
      </AuthLayout>
    );
  }
}

LoginScene.propTypes = {
  locale: PropTypes.string,
  title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  subTitle: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  emailPlaceholder: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  passwordPlaceholder: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  forgotPasswordText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  loginButtonText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  registerText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  registerUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
  forgotPasswordUrl: PropTypes.string,
  preSetEmail: PropTypes.string,
  preSetPassword: PropTypes.string,
  loginRequestUrl: PropTypes.string,
  tokenLocalStorageKey: PropTypes.string,
};

LoginScene.defaultProps = {
  locale: 'fi',
  title: undefined,
  subTitle: undefined,
  emailPlaceholder: undefined,
  passwordPlaceholder: undefined,
  forgotPasswordText: undefined,
  registerText: undefined,
  loginButtonText: undefined,
  redirectUrl: '/',
  forgotPasswordUrl: '/forgot',
  loginRequestUrl: `${window.API_ENDPOINT}/Members/login`,
  registerUrl: undefined,
  preSetEmail: '',
  preSetPassword: '',
  tokenLocalStorageKey: window.TOKEN_LOCAL_STORAGE_KEY,
};

export default LoginScene;
