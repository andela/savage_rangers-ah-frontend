import React, { Component } from 'react';
import apiActions from '../../ApiActions';

export class Home extends Component {
  state = {
    up: false,
    down: false
  }

  render() {
    return (
      <React.Fragment>
        <h1>Authors Heaven</h1>
        <p>This is the home page of authors heaven v 1.0.0</p>
      </React.Fragment>
    )
  }
}

export default Home
