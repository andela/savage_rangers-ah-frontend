/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Alert from '../Common/Alert';
import actions from '../../../Redux/Actions/passwordReset';

const { sendEmail } = actions;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps({ data }) {
    if (!_.isEmpty(data)) {
      this.setState({
        error: false,
        success: true
      });
    } else {
      this.setState({
        email: '',
        error: true
      });
    }
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = (event) => {
    const { state } = this;
    event.preventDefault();
    const { sendEmail: emailSender } = this.props;
    emailSender(state.email);
  };

  render() {
    const { state, props } = this;
    return (
      <div className="container resetPassword__container">
        {state.success ? (
          <Alert
            type="success"
            message={props.data.message}
            cssClass="alert-forgot-password alert-forgot-password__success"
          />
        ) : (
          ''
        )}
        {state.error ? (
          <Alert type="danger" message={props.errorMessage} cssClass="alert-forgot-password" />
        ) : (
          ''
        )}
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

ForgotPassword.defaultProps = { errorMessage: 'Cannot fetch' };

ForgotPassword.propTypes = {
  sendEmail: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
  errorMessage: propTypes.string
};
export const mapStateToProps = state => ({
  errorMessage: state.passwordReset.errorMessage,
  data: state.passwordReset.data
});

export default connect(mapStateToProps,
  { sendEmail })(ForgotPassword);
