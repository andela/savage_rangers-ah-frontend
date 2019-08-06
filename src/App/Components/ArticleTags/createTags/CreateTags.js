import React, { Component } from 'react';
import newTags from './CreatedTags';

export default class Tags extends Component {
  state = {
    NewTags: {
      id: 1,
      name: 'Techno'
    }
  };

  render() {
    const createdTags = this.state.NewTags.name.map(<newTags />);
    return (
      <div>
        <form>{createdTags}</form>
      </div>
    );
  }
}
