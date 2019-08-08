/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../Common/Alert';
import actions from '../../../Redux/Actions/passwordReset';

const { resetPassword } = actions;

export class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: '', confirmPassword: '', redirect: false };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps({ data, errorMessage }) {
    if (!_.isEmpty(data)) {
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

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async (event) => {
    const { state } = this;
    event.preventDefault();
    if (state.newPassword === state.confirmPassword) {
      const { resetPassword: passwordReset } = this.props;
      passwordReset(state.newPassword);
    } else {
      this.setState({ error: true, errorMessage: 'The two passwords have to match' });
    }
  };

  render() {
    const { state, props } = this;
    if (state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container login__container">
        {state.success && (
        <Alert type="success" message={props.data.message} cssClass="alert-reset-password" />
        )}
        {state.error && (
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

export default connect(mapStateToProps,
  { resetPassword })(PasswordReset);
