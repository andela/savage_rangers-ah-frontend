import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';
import { Link } from 'react-router-dom';

export class navbarProfile extends Component {
  render() {
    return (

      <div
        className="profile"
      >
        <ReactImageFallback
          className="profile__img"
          src="https://res.cloudinary.com/al-tech/image/upload/v1565805494/nenxg6yetjfgbk96iq8l.jpg"
          fallbackImage="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="profilePic"
          title="profile"
        />

        <Link to="/" href="/" className="profile__name">Frank Mutabazi</Link>
        <i className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        <div
          className="dropdown-menu"
          aria-labelledby="navbarDropdown"
          style={{
            position: 'absolute',
            top: 70,
            left: '86%',
            width: '2%',
            backgroundColor: '#F1EDED'
          }}
        >
          <a className="dropdown-item" href="/">Profile</a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="/">Settings</a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="/">Logout</a>
        </div>

      </div>
    );
  }
}

export default navbarProfile;
