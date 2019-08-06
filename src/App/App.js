import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import store from '../Redux/store';
import Tags from './Components/ArticleTags/getTags/Tags';
import newTags from './Components/ArticleTags/createTags/CreatedTags';

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
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Article/get" component={Tags} />
            <Route exact path="/Article/create" component={newTags} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
