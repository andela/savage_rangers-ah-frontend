import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login';
import Redirection from './Components/Redirection/redirect';
import ProfileComponent from './Components/Profile/Profile';
import TermsAndconditions from './Components/TermsAndConditions';
import ReadArticle from './Components/DisplayArticle/readArticle';
import store from '../Redux/store';
import RegistrationComponent from './Components/Registration/Registration';
import ForgotPassword from './Components/PasswordReset/ForgotPassword';
import ResetPassword from './Components/PasswordReset/ResetPassword';
import CreateArticle from './Components/CreateArticle/CreateArticle';
import 'react-toastify/dist/ReactToastify.css';
import Articles from './Components/Articles/getArticles/Articles';
import Search from './Components/search/search';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route exact path="/login" component={isAuth ? Home : Login} />
            <Route exact path="/redirect" component={Redirection} />
            <Route exact path="/signup" component={isAuth ? Home : RegistrationComponent} />
            <Route
              exact
              path="/forgot-password"
              component={!localStorage.getItem('token') ? ForgotPassword : Home}
            />
            <Route
              exact
              path="/reset-password"
              component={!localStorage.getItem('token') ? ResetPassword : Home}
            />
            <Route exact path="/profile" component={ProfileComponent} />
            <Route path="/update/article/:slug" component={isAuth ? CreateArticle : Login} />
            <Route exact path="/terms_and_conditions" component={TermsAndconditions} />
            <Route path="/article/new" component={isAuth ? CreateArticle : Login} />
            <Route exact path="/redirect" component={Redirection} />
            <Route exact path="/articles/:slug" component={ReadArticle} />
            <Route path="/profile" component={ProfileComponent} />
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/articles/search" component={Search} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
