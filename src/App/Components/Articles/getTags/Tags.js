import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tag from './Tag';
import { getTags } from '../../../../Redux/Actions/articles';

class Tags extends Component {
  state = { tags: [] };

  componentWillMount() {
    const { props } = this;
    props.getTags();
  }

  componentWillReceiveProps(nextProps) {
    const { articles } = nextProps;
    if (articles.articleTags) {
      this.setState({ tags: articles.articleTags });
    }
  }

  render() {
    const tags = this.state.tags.map(tag => <Tag key={tag.id} body={tag.name} />);
    return (
      <div>
        <div><h1>Authors Haven Article</h1></div>
        <div className="tag">
          {tags}
        </div>
      </div>
    );
  }
}


export default connect(state => state, { getTags })(Tags);
