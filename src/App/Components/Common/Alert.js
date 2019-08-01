import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorAlert extends Component {
  constructor(props) {
    super(props);
    const { type, cssClass } = this.props;
    const classData = `d-flex justify-content-center alert alert-dismissible fade show alert-${type} ${cssClass}`;
    this.state = { classData };
  }

  render() {
    const { classData } = this.state;
    const { message } = this.props;
    return (
      <div className={classData} role="alert" id="alert">
        {' '}
        {message}
      </div>
    );
  }
}

ErrorAlert.defaultProps = { message: 'default Message' };

ErrorAlert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  cssClass: PropTypes.string.isRequired
};
