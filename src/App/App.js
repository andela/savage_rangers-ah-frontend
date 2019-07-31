import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../App/Components/Home/Home';
import NotFound from '../App/Components/NotFound/NotFound';
import Login from "../App/Components/Login/Login";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
