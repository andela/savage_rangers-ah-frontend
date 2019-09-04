import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { Link } from 'react-router-dom';
import ErrorAlert from '../Common/Alert';
import RegistrationAction from '../../../Redux/Actions/Registration';
import SocialLogin from '../SocialLogin/socialLogin';
import Footer from '../Common/Footer';
import NavBar from '../Common/NavProfile/navbar';
/**
 * User's registration component
 *
 * @export
 * @class Registration
 * @extends {Component}
 * @author Alain burindi
 */

const { register } = RegistrationAction;

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      accepted: ''
    };
    this.validator = new SimpleReactValidator({
      locale: 'en',
      messages: { in: 'Your password and confirmation password do not match.' }
    });
    this.onChange = this.onChange.bind(this);
  }

  /**
   *handles the ochange event from input fields
   *and modify the state accordingly
   * @memberof Registration
   */
  onChange = async (event) => {
    const { target } = event;
    event.preventDefault();
    await this.setState({ [target.name]: target.value });
  };

  /**
   *handle the registration process after the form sublissin
   *
   * @memberof Registration
   */
  register = async (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { state } = this;
      const { register: registerAction } = this.props;
      const {
        username, email, password, confirmPassword
      } = state;
      registerAction({
        username,
        email,
        password,
        confirmPassword
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const {
      props: { error, message },
      state
    } = this;
    return (
      <div>
        <NavBar />
        <div className="container">
          {error ? <ErrorAlert message={error} type="danger" /> : ''}
          {message ? <ErrorAlert message={message} type="success" /> : ''}

          <form className="form-horizontal col-sm-6 common-form">
            <h2 className="common-form-h2">Signup</h2>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  id="username"
                  name="username"
                  value={state.username}
                  type="text"
                  placeholder="Username"
                  className="form-control common-form-input username-input"
                  onChange={this.onChange}
                />
                {this.validator.message('username', state.username, 'required|alpha_num_dash', { className: 'text-danger' })}
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  name="email"
                  value={state.email}
                  type="email"
                  placeholder="Email"
                  className="form-control common-form-input"
                  onChange={this.onChange}
                />
                {this.validator.message('email', state.email, 'required|email', { className: 'text-danger' })}
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  name="password"
                  value={state.password}
                  type="password"
                  placeholder="Password"
                  className="form-control common-form-input"
                  onChange={this.onChange}
                />
                {this.validator.message('password', state.password, 'required|string|min:8', { className: 'text-danger' })}
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  name="confirmPassword"
                  value={state.confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control common-form-input"
                  onChange={this.onChange}
                />
                {this.validator.message('confirm password',
                  state.confirmPassword,
                  `required|string|min:8|in:${state.password}`,
                  { className: 'text-danger' })}
              </div>
            </div>
            <div className="col-sm-12 mb-2">
              <input
                className="mr-2"
                type="checkbox"
                name="accepted"
                onChange={() => {
                  this.setState(prevState => ({ accepted: !prevState.accepted }));
                }}
              />
              Agree to
              {' '}
              <Link to="/terms_and_conditions">terms and conditions</Link>
              {this.validator.message('terms and conditions', state.accepted, 'accepted', { className: 'text-danger' })}
            </div>
            <button
              type="submit"
              className="btn btn-block col-sm-8 common-form-button"
              onClick={this.register}
            >
              Signup
            </button>
            <p className="text-center">
              Already have an account ?
              <a href="/login">Log in</a>
            </p>

            <SocialLogin />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

Registration.propTypes = {
  register: propTypes.func.isRequired,
  error: propTypes.string,
  message: propTypes.string
};
export const mapStateToProps = state => ({
  error: state.registration.error,
  message: state.registration.message
});

export default connect(mapStateToProps,
  { register })(Registration);
