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

  getLoginRequestUrl() {
    return this.props.loginRequestUrl;
  }

  getTitle() {
    return this.props.title;
  }

  getSubTitle() {
    return this.props.subTitle;
  }

  getEmailPlaceholder() {
    return this.props.emailPlaceholder;
  }

  getPasswordPlaceholder() {
    return this.props.passwordPlaceholder;
  }

  getForgotText() {
    return this.props.forgotPasswordText;
  }

  getLoginButtonText() {
    return this.props.loginButtonText;
  }

  getRegisterText() {
    return this.props.registerText;
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
  title: PropTypes.string,
  subTitle: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  passwordPlaceholder: PropTypes.string,
  forgotPasswordText: PropTypes.string,
  loginButtonText: PropTypes.string,
  registerText: PropTypes.string,
  registerUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
  forgotPasswordUrl: PropTypes.string,
  preSetEmail: PropTypes.string,
  preSetPassword: PropTypes.string,
  loginRequestUrl: PropTypes.string,
  tokenLocalStorageKey: PropTypes.string,
};

LoginScene.defaultProps = {
  title: 'Login',
  subTitle: 'Fill form and login',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Password',
  forgotPasswordText: 'Forgot password?',
  redirectUrl: '/',
  loginButtonText: 'Login',
  registerText: 'New? Create new account!',
  forgotPasswordUrl: '/forgot',
  loginRequestUrl: `${window.API_ENDPOINT}/Members/login`,
  registerUrl: undefined,
  preSetEmail: '',
  preSetPassword: '',
  tokenLocalStorageKey: window.TOKEN_LOCAL_STORAGE_KEY,
};

export default LoginScene;
