import React from 'react';
import isEmpty from 'lodash/isEmpty';
import ReactImageFallback from 'react-image-fallback';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from 'react-pagination-library';
import urls from '../../../configs/urls';

const { defaultUserProfileImage } = urls;
export default function BookMark(props) {
  const {
    data, remove, owner, changePage
  } = props;
  const { paginationDetail: { count, currentPage, pages } } = data;
  return (
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
            fallbackImage={defaultUserProfileImage}
            className="col-2"
          />
          <p className="col-3 mt-3 bookmark_container-username">
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
      {/* <Paginate
        currentPage={activePage}
        totalPages={numberOfPage}
        changeCurrentPage={this.changePage}
      /> */}
      <Paginate currentPage={currentPage} totalPages={pages} changeCurrentPage={changePage} />
    </div>
  );
}

BookMark.propTypes = {
  data: propTypes.object,
  remove: propTypes.func.isRequired,
  owner: propTypes.bool
};
