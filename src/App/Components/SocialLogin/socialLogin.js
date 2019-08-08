import React, { Component } from 'react';
import Separator from '../Separator/or_separator';
import urls from '../../../configs/urls';

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-btn text-center">
        <Separator name="or" />
        <a href={urls.facebookLink} className="btn btn-primary btn-lg" title="Facebook">
          <i className="fab fa-facebook-f" />
        </a>
        <a href={urls.twitterLink} className="btn btn-info btn-lg" title="Twitter">
          <i className="fab fa-twitter" />
        </a>
        <a href={urls.googleLink} className="btn btn-danger btn-lg" title="Google">
          <i className="fab fa-google" />
        </a>
      </div>
    );
  }
}

export default SocialLogin;
