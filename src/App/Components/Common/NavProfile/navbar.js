import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLogo from './navLogo';
// import NavLink from './navLink';

export class navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <NavLogo />
        <h3 id="web-name">Authors-Haven</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse nav-links-container" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/login">
              Login
            </Link>
            <div className="nav-item nav-link to-hide-on-responsive">|</div>
            <Link className="nav-item nav-link" to="/signup">
              Signup
            </Link>
          </div>
        </div>
        {/* <NavLink /> */}
      </nav>
    );
  }
}

export default navbar;
