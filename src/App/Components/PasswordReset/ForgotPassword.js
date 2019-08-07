import React, { Component } from 'react';
import axiosInstance from '../../../configs/axios';
import Alert from '../Common/Alert';

export class PasswordReset extends Component {
  state = { email: '' };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = async (event) => {
    const { state } = this;
    event.preventDefault();
    await axiosInstance
      .post('/api/password-reset', { email: state.email })
      .then((res) => {
        this.setState({
          error: false,
          success: true,
          data: res.data,
          errorMessage: ''
        });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        this.setState({
          email: '',
          error: true,
          success: false,
          errorMessage
        });
      });
  };

  reloadState = () => {
    this.setState({
      email: '',
      error: false,
      data: {},
      errorMessage: '',
      success: false
    });
  };

  render() {
    const { state } = this;
    return (
      <div className="container resetPassword__container">
        {state.success
          ? setTimeout(() => {
            this.reloadState();
          }, 5000) && (
          <Alert type="success" message={state.data.message} cssClass="alert-forgot-password" />
          )
          : ''}
        {state.error
          ? setTimeout(() => {
            this.reloadState();
          }, 5000) && (
          <Alert type="danger" message={state.errorMessage} cssClass="alert-forgot-password" />
          )
          : ''}
        <div className="row">
          <div className="col-sm-12 col-md-10">
            <div className="resetPassword">
              <div className="resetPassword__header justify-content-center">
                <h1 className="resetPassword__header--text">Password Reset</h1>
              </div>
              <form onSubmit={this.onSubmit} className="container resetPassword__form">
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control form-input"
                    onChange={this.onChange}
                  />
                </div>
                <button type="submit" className="btn resetPassword__form--btn">
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
