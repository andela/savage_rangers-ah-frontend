import React, { Component } from 'react';
import NavLogo from './navLogo';
import NavLink from './navLink';

export class navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <NavLogo />
        <h3 id="web-name">Authors-Haven</h3>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <NavLink />
      </nav>
    );
  }
}

export default navbar;
