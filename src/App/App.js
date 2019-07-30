import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../App/Components/Home';
import NotFound from '../App/Components/NotFound';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
