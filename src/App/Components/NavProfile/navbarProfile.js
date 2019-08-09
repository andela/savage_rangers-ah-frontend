import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../../../Style/Assets/Teach.png';

export class navbarProfile extends Component {
  render() {
    return (

      <div
        className="profile"
      >
        <img
          className="profile__img"
          src={image}
          alt="profilePic"
          title="profile"
        />

        <Link to="/" className="profile__name">Frank Mutabazi</Link>
        <i className="fas fa-caret-down" id="icon" />

      </div>
    );
  }
}

export default navbarProfile;
