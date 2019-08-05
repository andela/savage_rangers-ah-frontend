import React, { Component } from 'react';
import Welcome from '../TestRedux';

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Authors Heaven</h1>
        <p>This is the home page of authors heaven v 1.0.0</p>
        <Welcome />
      </React.Fragment>
    );
  }
}

export default Home;
