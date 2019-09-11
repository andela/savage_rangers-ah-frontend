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
          <svg width="50" height="100" viewBox="0 0 25 25">
            <path
              d="M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13a.5.5 0 0 0 .71-.03.5.5 0 0 0 .12-.29H19V6zm-6.84 9.97L7 19.64V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v13.64l-5.16-3.67a.49.49 0 0 0-.68 0z"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg width="50" height="100" viewBox="0 0 25 25">
            <path d="M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13c.2.18.52.17.71-.03a.5.5 0 0 0 .12-.29H19V6z" />
          </svg>
        )}
      </button>
    </div>
  ) : (
    <i className="icon-spinner icon-spin icon-large" />
  );
}

Bookmark.propTypes = {
  slug: propTypes.string.isRequired,
  bookmark: propTypes.func.isRequired,
  bookmarks: propTypes.array.isRequired
};

export default connect(null,
  { bookmark })(Bookmark);
