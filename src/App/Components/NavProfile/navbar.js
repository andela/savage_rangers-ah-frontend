import React, { Component } from 'react';
import NavbarProfile from './navbarProfile';
import NavLogo from './navLogo';
import NavLink from './navLink';

export class navbar extends Component {
  render() {
    return (
      <div className="row">
        <div className="nav-body col-sm-12 col-md-12 col-lg-12">
          <NavLogo />
          <NavLink />
          <NavbarProfile />
        </div>
      </div>

    );
  }
}

export default navbar;
