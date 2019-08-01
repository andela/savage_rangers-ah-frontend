import React, { Component } from 'react';
import queryString from 'query-string';

export class redirect extends Component {
  componentDidMount() {
    const { token } = queryString.parse(window.location.search);
    localStorage.setItem('token', token);
  }

  render() {
    return (
      <div>
        <center id="redirect-text">Redirection Page</center>
      </div>
    );
  }
}

export default redirect;
