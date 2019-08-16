import React from 'react';
import _ from 'lodash';
import ReactImageFallback from 'react-image-fallback';

export default function BookMark(props) {
  const { data } = props;
  return !_.isEmpty(data) ? (
    <div>
      {data.bookmarks.map(bookmark => (
        <div key={bookmark.id} className="row mt-4 bookmark_container">
          <div className="col-12 mt-2">
            <h4 className="col-12 bookmark_container_title">{bookmark.Article.title}</h4>
            <div className="row">
              <div className={`${bookmark.Article.Category.name}`} />
              <p className="col-3">{bookmark.Article.Category.name}</p>
            </div>
          </div>
          <p className="col-12 m-3">{bookmark.Article.description}</p>
          <ReactImageFallback
            src={bookmark.Article.User.profileImage}
            fallbackImage="https://res.cloudinary.com/al-tech/image/upload/v1566213662/usermale_jxmkj5.png"
            className="col-2"
          />
          <p className="col-3 mt-3">
            {`${bookmark.Article.User.firstName}   ${bookmark.Article.User.lastName}`}
          </p>
          <p className="bookmark_container_read_more m-2 p-1">Read more</p>
          <p className="btn-danger bookmark_container_remove m-2 p-1">Remove</p>
        </div>
      ))}
    </div>
  ) : (
    'false'
  );
}

/* <p>{bookmark.articleSlug}</p> */
