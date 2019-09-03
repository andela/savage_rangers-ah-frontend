// import React, { Component } from 'react';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import Bookmark from './Bookmark';
import bookmarkActions from '../../../../Redux/Actions/bookmark';

const { getBookMarks } = bookmarkActions;
export class ExempleArticle extends Component {
  componentDidMount() {
    this.fetchBookmark();
  }

  componentWillReceiveProps({ bookmarked }) {
    if (bookmarked) {
      this.fetchBookmark();
      this.forceUpdate();
    }
  }

  fetchBookmark = () => {
    const { getBookMarks: getBookMarksData } = this.props;
    getBookMarksData('Burindi');
  };

  render() {
    const { bookmarks } = this.props;
    return (
      <div>
        <Bookmark
          username="Burindi"
          slug="i-dont-want-to-live-in-ohio-i-belong-in-new-york-j07n6mx0y8q"
          bookmarks={bookmarks}
        />
      </div>
    );
  }
}

ExempleArticle.propTypes = {
  getBookMarks: propTypes.func.isRequired,
  bookmarked: propTypes.bool.isRequired,
  bookmarks: propTypes.array
};

export const mapStateToProps = state => ({
  bookmarks: state.bookmark.bookmarks,
  bookmarked: state.bookmark.bookmarked
});

export default connect(mapStateToProps,
  { getBookMarks })(ExempleArticle);
