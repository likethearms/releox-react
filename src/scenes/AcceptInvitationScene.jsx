import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import AuthLayout from '../components/AuthLayout';
import Loading from '../components/Loading';
import getErrorMessage from '../utils/get-error-message';
import OneInputActionForm from '../components/OneInputActionForm';
import CenterContent from '../components/CenterContent';
import CardTitle from '../components/CardTitle';

class AcceptInvitation extends Component {
  static checkInvitationIsUndone(r) {
    if (r.data.invitationDone) return Promise.reject(new Error('Account already is ready to use.'));
    return Promise.resolve(r);
  }

  constructor(props) {
    super(props);
    let query = {};
    if (!props.skipValidation) {
      query = queryString.parse(window.location.search);
    }
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
    const { validateTokenUrl, skipValidation } = this.props;
    const { query } = this.state;

    if (skipValidation) {
      this.setState({ loading: false });
    } else {
      axios
        .get(`${validateTokenUrl}/${query.user || query.userId}?access_token=${query.access_token}`)
        .then(r => AcceptInvitation.checkInvitationIsUndone(r))
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
      .then(() => this.removeToken())
      .then(() => this.setState({ redirect: true }))
      .catch(this.onCatchError.bind(this));
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
      password, message, loading, redirect, accessDenied,
    } = this.state;
    const { redirectUrl } = this.props;
    let page;
    if (redirect) return <Redirect to={redirectUrl} />;
    if (loading) return <CenterContent><Loading /></CenterContent>;
    if (accessDenied) {
      page = (
        <CenterContent>
          <div className="col-6 text-center">
            <CardTitle>{accessDenied}</CardTitle>
            <Link to="/login">Back to login</Link>
          </div>
        </CenterContent>
      );
    } else {
      page = (
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
    return page;
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
  updateUrl: `${window.API_ENDPOINT}/reset-password`,
  validateTokenUrl: `${window.API_ENDPOINT}/Members`,
  removeAccessTokenUrl: `${window.API_ENDPOINT}/Members/logout`,
  title: 'Accept invitation',
  skipValidation: false,
  subTitle: 'Finnish your account and login!',
  placeholder: 'Password',
  buttonText: 'Save',
};

export default AcceptInvitation;
