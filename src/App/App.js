import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import NotFound from './Components/ArticleNotFound/ArticleNotFound';
import Login from './Components/Login';
import TermsAndconditions from './Components/TermsAndConditions';
import Redirection from './Components/Redirection/redirect';
import ReadArticle from './Components/DisplayArticle/readArticle';
import ProfileComponent from './Components/Profile/Profile';
import store from '../Redux/store';
import RegistrationComponent from './Components/Registration/Registration';
import ForgotPassword from './Components/PasswordReset/ForgotPassword';
import ResetPassword from './Components/PasswordReset/ResetPassword';
import CreateArticle from './Components/CreateArticle/CreateArticle';
import UpdateArticle from './Components/CreateArticle/UpdateArticle';
import DisplayAuthors from './Components/authors';
import Articles from './Components/Articles/getArticles/Articles';

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
            <Route exact path="/authors" component={DisplayAuthors} />
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
            <Route exact path="/terms_and_conditions" component={TermsAndconditions} />
            <Route path="/articles/new" component={isAuth ? CreateArticle : Login} />
            <Route exact path="/redirect" component={Redirection} />
            <Route exact path="/articles/:slug" component={ReadArticle} />
            <Route path="/articles/:slug/edit" component={isAuth ? UpdateArticle : Login} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/profile" component={ProfileComponent} />
            <Route exact path="/articles" component={Articles} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
