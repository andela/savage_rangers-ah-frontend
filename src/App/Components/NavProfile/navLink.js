import React, { Component } from 'react';
import NavLink from './navbarProfile';

export class navLink extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          className="navbar-nav mr-auto"
          style={{ marginLeft: '10%' }}
        >
          <li className="nav-item active">
            <a className="nav-link" href="/">
HOME |
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/">
TECHNOLOGY |
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/">
MUSIC |
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/">
LOVE |
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/">
ART |
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/">
BUSINESS |
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/">
ENTERTAINMENT
              {' '}
              <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <NavLink />
      </div>
    );
  }
}

export default navLink;
