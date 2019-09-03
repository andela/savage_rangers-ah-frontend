import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import propTypes from 'prop-types';
import Input from '../Inputs';
import login from '../../../Redux/Actions/auth';
import Navbar from '../Common/NavProfile/navbar';
import Footer from '../Common/Footer';
import SocialLogin from '../SocialLogin/socialLogin';

import Alert from '../Common/Alert';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { Email: '', Password: '' };
    this.validator = new SimpleReactValidator({ locale: 'en' });
  }

  handleInput = (name, value) => this.setState({ [name]: value });

  handleLogin = (e) => {
    const { dispatchLogin } = this.props;
    const { Email, Password } = this.state;
    e.preventDefault();
    if (this.validator.allValid()) dispatchLogin({ Email, Password });
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { validator, state } = this;

    let errorMessage;
    const {
      authReducer: { errors, isAuthorized, user },
      history
    } = this.props;
    if (!isAuthorized && errors) errorMessage = errors.error || errors.email;
    if (isAuthorized) history.replace(`/profile/${user.username}`);

    return (
      <div className="">
        <Navbar />
        <div className="container custom-login">
          <section className="wrapper">
            <div className="col-center">
              {errorMessage ? <Alert message={errorMessage} type="danger" cssClass="danger" /> : ''}

              <form className="form-horizontal common-form col-sm-6">
                <p className="common-form-h2">Login</p>
                {['Email', 'Password'].map((element, index) => (
                  <div key={String(index)} style={{ width: '100%' }} className="form-group">
                    <Input
                      name="input"
                      className="form-control col-sm-12"
                      placeholder={element}
                      inputMode={element}
                      onChange={({ target }) => this.handleInput(element, target.value)}
                      autoComplete={element}
                      required
                      type={element}
                    />

                    {index === 0
                      ? validator.message('email', state.Email, 'required|email', { className: 'text-danger' })
                      : validator.message('password', state.Password, 'required|string|min:8', { className: 'text-danger' })}
                  </div>
                ))}
                <div className="links">
                  <p className="float-left m-3 links links-right">
                    Don't have an account ?
                    {' '}
                    <a href="/signup">Sign up</a>
                  </p>
                  <Link className="float-right m-3 links links-right" to="/forgot-password">
                    Forgot your password?
                  </Link>
                </div>
                <button
                  id="login-button"
                  type="submit"
                  name="submit"
                  className="btn btn-block col-sm-8 common-form-button"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
                <SocialLogin />
              </form>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLogin: propTypes.func.isRequired,
  authReducer: propTypes.object,
  history: propTypes.object
};

export const mapStateToProps = ({ authReducer }) => ({ authReducer });

export const mapDispatchToProps = dispatch => ({ dispatchLogin: user => dispatch(login(user)) });

export default connect(mapStateToProps,
  mapDispatchToProps)(Login);
