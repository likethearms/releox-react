import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import AuthLayout from '../components/AuthLayout';
import Loading from '../components/Loading';
import getErrorMessage from '../utils/get-error-message';
import OneInputActionForm from '../components/OneInputActionForm';

class ResetPasswordScene extends Component {
  constructor(props) {
    super(props);
    let query = {};
    if (!props.skipValidation) {
      query = queryString.parse(window.location.search);
    }
    this.state = {
      loading: true,
      redirect: false,
      query,
      password: '',
      message: '',
      blockMessage: '',
    };
  }

  componentDidMount() {
    const { skipValidation } = this.props;
    if (skipValidation) {
      this.setState({ loading: false });
    } else {
      this.validateToken();
    }
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
      return this.setState({ blockMessage: getErrorMessage(error), loading: false });
    }
    return this.setState({ message: getErrorMessage(error), loading: false });
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

  validateToken() {
    const { query } = this.state;
    const { validateTokenUrl } = this.props;
    axios.get(`${validateTokenUrl}/${query.user || query.userId}?access_token=${query.access_token}`)
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.onCatchError(error, true);
      });
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
      password, loading, message, redirect, blockMessage,
    } = this.state;
    const { redirectUrl } = this.props;
    if (redirect) return (<Redirect to={redirectUrl} />);
    if (loading) {
      return (
        <AuthLayout>
          <Loading centeredVertical />
        </AuthLayout>
      );
    }
    if (blockMessage) {
      return (
        <AuthLayout>
          <h4>{blockMessage}</h4>
        </AuthLayout>
      );
    }
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
  validateTokenUrl: `${window.API_ENDPOINT}/Members`,
  removeAccessTokenUrl: `${window.API_ENDPOINT}/Members/logout`,
  skipValidation: false,
  redirectUrl: '/login',
  title: 'Set new password',
  subTitle: 'Write new password and click save!',
  placeholder: 'Password',
  buttonText: 'Save',
};

export default ResetPasswordScene;
