import React, { Component } from 'react';
import { combination } from 'redux';
import { connect } from 'react-redux';
import CreateArticle from '../../../../Redux/Actions/articles';


const { newArticle } = CreateArticle;

/**
 * Create Article Component
 *
 * @export
 * @class createArticle
 * @extends {Component}
 * @author R
 */
export default class createArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tags: ['']
    };
    this.onChange = this.onChange.bind(this);
  }

  async componentWillReceiveProps({ article }) {
    if (article) {
      await localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJ1c2VybmFtZSI6IkJ1cmluZGlBbGFpbjUiLCJlbWFpbCI6ImFsYWluNUBnbWFpbC5jb20ifSwiaWF0IjoxNTY1Mjg5NTcyLCJleHAiOjE1NjUzNzU5NzJ9.IO1hRgjIAKAwzxprECVCBiQji5Fa47x_2FzLS1a9Gb4');
      window.location.href = '/';
    }
  }

  onChange = (event) => {
    const { target } = event;
    event.preventDefault();
    this.setState({ [target.name]: target.value });
  }

  newArticle = (e) => {
    const { target } = event;
    const { newArticle: createArticle } = this.props;
    e.preventDefault();
    createArticle(state);
  }

  render() {
    const { state } = this;
    return (
      <div className="container">
        <h2>Authors haven</h2>
        <p>New Article</p>
        <form className="NewArticle">
          <div className="form-group">
            <input type="text" className="form-control articleInputs" id="usr" name="title" placeholder="Title" onChange={this.onChange} />
            <textarea className="form-control articleInputs" rows="5" id="comment" name="text" placeholder="Body" onChange={this.onChange} />
            <input type="text" className="form-control articleInputs" id="usr" name="tags" placeholder="Tags" onChange={this.onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.CreateArticle}>Submit</button>
        </form>
      </div>
    );
  }
}
//  export default combination{  connect(mapStateToProps, { CreateArticle })(createArticle),  createArticle };

// export const mapStateToProps = state => ({ newArticle: state.newArticle.article });
// export default createArticle;
