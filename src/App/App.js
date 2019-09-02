import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login';
import store from '../Redux/store';
import RegistrationComponent from './Components/Registration/Registration';
import ForgotPassword from './Components/PasswordReset/ForgotPassword';
import ResetPassword from './Components/PasswordReset/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import Redirection from './Components/Redirection/redirect';

/**
 *
 *
 * @export
 * @class App
 * @extends {react-Component}
 */
class App extends Component {
  /**
   * This function render the page
   *
   * @static
   * @render {page} req the request
   * @memberof App
   * @returns {Component} res
   */
  render() {
    const isAuth = localStorage.getItem('token');
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={!isAuth ? Login : Home} />
            <Route exact path="/redirect" component={Redirection} />
            <Route exact path="/signup" component={isAuth ? Home : RegistrationComponent} />
            <Route exact path="/forgot-password" component={!isAuth ? ForgotPassword : Home} />
            <Route exact path="/reset-password" component={!isAuth ? ResetPassword : Home} />
            <Route exact path="/redirect" component={Redirection} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
