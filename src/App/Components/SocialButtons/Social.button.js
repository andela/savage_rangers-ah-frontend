import React, { Component } from 'react';

class SocialButton extends Component {
    facebookLink = 'https://authors-heaven.herokuapp.com/api/users/facebook';

    twitterLink = 'https://authors-heaven.herokuapp.com/api/users/twitter';

    googleLink = 'https://authors-heaven.herokuapp.com/api/users/google';

    render() {
      return (
        <div className="social-btn text-center">
          <a href={this.facebookLink} className="btn btn-primary btn-lg" title="Facebook"><i className="fab fa-facebook-f" /></a>
          <a href={this.twitterLink} className="btn btn-info btn-lg" title="Twitter"><i className="fab fa-twitter" /></a>
          <a href={this.googleLink} className="btn btn-danger btn-lg" title="Google"><i className="fab fa-google" /></a>
        </div>
      );
    }
}

export default SocialButton;
