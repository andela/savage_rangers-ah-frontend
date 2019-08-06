import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.body}</h4>
      </div>
    );
  }
}
