import React, { Component } from 'react';
import queryString from 'query-string';
import axiosInstance from '../../../../configs/axios';
import Alert from '../Common/Alert';

export class PasswordReset extends Component {
  state = { newPassword: '', confirmPassword: '' };

  onChange = (event) => {
    this.forceUpdate();
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async (event) => {
    const { state } = this;
    event.preventDefault();
    if (state.newPassword === state.confirmPassword) {
      await axiosInstance
        .post(`/api/password-reset/update/${queryString.parse(window.location.search).email}`, { password: state.newPassword })
        .then((res) => {
          this.setState({ success: true, data: res.data });
        })
        .catch((error) => {
          const errorObject = error.response.data.errors;
          const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
          this.setState({ error: true, errorMessage });
        });
    } else {
      this.setState({
        error: true,
        errorMessage: 'The two passwords have to match'
      });
    }
  };

  reloadState = () => {
    this.setState({
      newPassword: '',
      confirmPassword: '',
      success: false,
      error: false,
      errorMessage: ''
    });
  };

  render() {
    const { state } = this;
    return (
      <div className="container login__container">
        {state.success
          && setTimeout(() => {
            this.reloadState();
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          }, 5000) && (
            <Alert type="success" message={state.data.message} cssClass="alert-reset-password" />
        )}
        {state.error
          && setTimeout(() => {
            this.reloadState();
          }, 5000) && (
            <Alert type="danger" message={state.errorMessage} cssClass="alert-reset-password" />
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
              <form onSubmit={this.onSubmit} className="container resetPassword__form">
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.onChange}
                    name="newPassword"
                    placeholder="New Password"
                    className="form-control form-input"
                    id="newPassword"
                  />
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
                </div>
                <button
                  type="submit"
                  value="Submit"
                  className="resetPassword__form--btn btn resetPassword__form--btn__transform"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
