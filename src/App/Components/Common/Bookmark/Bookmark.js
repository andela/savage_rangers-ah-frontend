import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import bookmarkActions from '../../../../Redux/Actions/bookmark';
import compareBookmark from '../../../../Helpers/compareBookmarks';

const { bookmark } = bookmarkActions;

export function Bookmark(props) {
  const { slug, bookmark: bookmarkAction, bookmarks } = props;

  return bookmarks ? (
    <div className="boomark_article">
      <button type="button" onClick={() => bookmarkAction(slug)}>
        {!compareBookmark(bookmarks, slug) ? (
          <i className="far fa-bookmark fa-3x" />
        ) : (
          <i className="fa fa-bookmark fa-3x" />
        )}
      </button>
    </div>
  ) : (
    'loading'
  );
}

Bookmark.propTypes = {
  slug: propTypes.string.isRequired,
  bookmark: propTypes.func.isRequired,
  bookmarks: propTypes.array.isRequired
};

export default connect(null,
  { bookmark })(Bookmark);
