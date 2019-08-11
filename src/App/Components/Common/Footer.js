import React, { Component } from 'react';

export class Footer extends Component {
  render() {
    const date = new Date();
    return (
      <div className="footer text-center">
        <p className="footer-copyright">
          &copy; Authors Haven
          {date.getFullYear()}
        </p>
      </div>
    );
  }
}

export default Footer;
