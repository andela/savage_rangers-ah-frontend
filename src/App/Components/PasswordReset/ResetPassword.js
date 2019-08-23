/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Common/Alert';
import actions from '../../../Redux/Actions/passwordReset';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';

const { resetPassword } = actions;

export class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: '', confirmPassword: '', redirect: false };
    this.onChange = this.onChange.bind(this);
    this.validator = new SimpleReactValidator({
      locale: 'en',
      messages: { in: 'New password and confirm password did not match' }
    });
  }

  componentWillReceiveProps({ data, errorMessage }) {
    if (!_.isEmpty(data)) {
      const { token } = data;
      localStorage.setItem('token', token);
      this.setState({
        error: false,
        success: true,
        redirect: true
      });
    } else {
      this.setState({
        error: true,
        success: false,
        errorMessage
      });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async event => {
    const { state } = this;
    event.preventDefault();
    if (this.validator.allValid()) {
      const { resetPassword: passwordReset } = this.props;
      passwordReset(state.newPassword);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { state, props } = this;
    if (state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container login__container">
          {state.success && (
            <Alert
              type="success"
              message={props.data.message}
              cssClass="alert-reset-password"
            />
          )}
          {state.error && (
            <Alert
              type="danger"
              message={state.errorMessage}
              cssClass="alert-reset-password"
            />
          )}
          <div className="row">
            <div className="col-sm-12 col-md-10">
              <div className="resetPassword">
                <div className="resetPassword__variation justify-content-center">
                  <h4 className="resetPassword__header--text resetPassword__header--transform">
                    Please provide your new password
                  </h4>
                  <hr />
                </div>
                <form
                  onSubmit={this.onSubmit}
                  className="container resetPassword__form">
                  <div className="form-group">
                    <input
                      type="password"
                      onChange={this.onChange}
                      name="newPassword"
                      placeholder="New Password"
                      className="form-control form-input"
                      id="newPassword"
                    />
                    {this.validator.message(
                      'newPassword',
                      state.newPassword,
                      'required|string|min:8',
                      { className: 'field-alert text-danger' }
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      onChange={this.onChange}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control form-input"
                    />
                    {this.validator.message(
                      'confirmPassword',
                      state.confirmPassword,
                      `required|string|min:8|in:${state.newPassword}`,
                      { className: 'field-alert text-danger' }
                    )}
                  </div>
                  <button
                    type="submit"
                    value="Submit"
                    className="resetPassword__form--btn btn resetPassword__form--btn__transform">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PasswordReset.defaultProps = { errorMessage: 'Cannot fetch' };

PasswordReset.propTypes = {
  resetPassword: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
  errorMessage: propTypes.string
};
export const mapStateToProps = state => ({
  errorMessage: state.passwordReset.errorMessage,
  data: state.passwordReset.data
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(PasswordReset);
