import React from 'react';
import _ from 'lodash';
import ReactImageFallback from 'react-image-fallback';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function BookMark(props) {
  const { data, remove, owner } = props;

  return !_.isEmpty(data) ? (
    <div>
      {data.bookmarks.map(bookmark => (
        <div key={bookmark.Article.id} className="row mt-4 bookmark_container p-3">
          <div className="col-12 mt-2">
            <h4 className="col-12 bookmark_container_title">{bookmark.Article.title}</h4>
            <div className="row">
              <div className={`category ${bookmark.Article.Category.name}`} />
              <p className="col-3">{bookmark.Article.Category.name}</p>
            </div>
          </div>
          <p className="col-12 m-3 bookmark_container_description">
            {bookmark.Article.description}
          </p>
          <ReactImageFallback
            src={bookmark.Article.User.profileImage}
            fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
            className="col-2"
          />
          <p className="col-3 mt-3">
            {`${bookmark.Article.User.firstName}   ${bookmark.Article.User.lastName}`}
          </p>
          <Link
            to={`articles/${bookmark.articleSlug}`}
            className="bookmark_container_read_more m-2 p-1"
          >
            Read more
          </Link>
          {owner && (
            <button
              type="button"
              className="btn-danger bookmark_container_remove m-2 p-1"
              onClick={() => remove(bookmark.articleSlug)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  ) : (
    'No bookmark'
  );
}

BookMark.propTypes = {
  data: propTypes.object.isRequired,
  remove: propTypes.func.isRequired,
  owner: propTypes.bool.isRequired
};
