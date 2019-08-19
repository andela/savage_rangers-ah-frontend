import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class navLinks extends Component {
  render() {
    return (
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="/login">
          Login
        </Link>
        <div className="nav-item nav-link to-hide-on-responsive">|</div>
        <Link className="nav-item nav-link" to="/signup">
          Signup
        </Link>
      </div>
    );
  }
}

export default navLinks;
