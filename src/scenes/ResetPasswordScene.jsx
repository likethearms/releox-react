import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import AuthLayout from '../components/AuthLayout';
import Loading from '../components/Loading';
import getErrorMessage from '../utils/get-error-message';

class ResetPasswordScene extends Component {
  constructor(props) {
    super(props);
    let query = {};
    if (!props.skipValidation) {
      query = queryString.parse(props.location.search);
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
    return axios.post(`${removeAccessTokenUrl}/logout`, undefined, { params: { access_token } });
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
        <form onSubmit={this.onSubmit.bind(this)}>
          <h1>{this.getTitle()}</h1>
          <p className="text-muted">{this.getSubTitle()}</p>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock" />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={this.getPlaceholder()}
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="row">
            <div className="col-12 text-right">
              <button type="submit" className="btn btn-primary px-4">{this.getButtonText()}</button>
            </div>
          </div>
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

ResetPasswordScene.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  updatePasswordAPIUrl: PropTypes.string,
  skipValidation: PropTypes.bool,
  removeAccessTokenUrl: PropTypes.string,
  validateTokenUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
};

ResetPasswordScene.defaultProps = {
  updatePasswordAPIUrl: `${window.API_ENDPOINT}/reset-password`,
  validateTokenUrl: `${window.API_ENDPOINT}/Member`,
  removeAccessTokenUrl: `${window.API_ENDPOINT}/Member/logout`,
  skipValidation: false,
  redirectUrl: '/login',
  title: 'Set new password',
  subTitle: 'Write new password and click save!',
  placeholder: 'Password',
  buttonText: 'Save',
};

export default ResetPasswordScene;
