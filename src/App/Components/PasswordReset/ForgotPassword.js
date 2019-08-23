/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { connect } from 'react-redux';
import Alert from '../Common/Alert';
import actions from '../../../Redux/Actions/passwordReset';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';

const { sendEmail } = actions;

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
    this.onChange = this.onChange.bind(this);
    this.validator = new SimpleReactValidator({ locale: 'en' });
  }

  componentWillReceiveProps({ data }) {
    if (!_.isEmpty(data)) {
      this.setState({
        error: false,
        success: true
      });
    } else {
      this.setState({
        error: true,
        success: false
      });
    }
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = (event) => {
    const { state } = this;
    event.preventDefault();
    const { sendEmail: emailSender } = this.props;
    if (this.validator.allValid()) {
      emailSender(state.email);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { state, props } = this;
    const { errorMessage } = this.props;
    return (
      <div className="">
        <Navbar />
        <div className="container forgotPassword__container">
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
            <Alert
              type="danger"
              message={errorMessage}
              cssClass="alert-forgot-password"
            />
          ) : (
            ''
          )}
          <div className="row">
            <div className="col-sm-12 col-md-10">
              <div className="forgotPassword">
                <div className="forgotPassword__header justify-content-center">
                  <h1 className="forgotPassword__header--text">
                    Password Reset
                  </h1>
                </div>
                <form
                  onSubmit={this.onSubmit}
                  className="container forgotPassword__form"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="form-control form-input"
                      onChange={this.onChange}
                    />
                    {this.validator.message('email',
                      state.email,
                      'required|email',
                      { className: 'field-alert text-danger' })}
                  </div>
                  <button
                    type="submit"
                    className="btn forgotPassword__form--btn"
                  >
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

ForgotPassword.defaultProps = { errorMessage: 'cannot fetch' };

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
