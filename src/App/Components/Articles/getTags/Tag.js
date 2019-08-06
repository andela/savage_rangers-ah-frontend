import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    return (
      <React.Fragment>
        <button  className="btn btn-default">
          {this.props.body}
        </button>
      </React.Fragment>
    );
  }
}
