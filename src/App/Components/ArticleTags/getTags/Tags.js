import React, { Component } from 'react';
import axios from 'axios';
import Tag from './Tag';

export default class Tags extends Component {
  state = { tags: [] };

  componentWillMount() {
    axios
      .get('https://authors-heaven.herokuapp.com/api/articles/How-to-create-sequalize-seeds/tags')
      .then(res => this.setState({ tags: res.data.data }));
  }

  render() {
    const getTags = this.state.tags.map(tag => <Tag key={tag.id} body={tag.name} />);
    return <div>{getTags}</div>;
  }
}
