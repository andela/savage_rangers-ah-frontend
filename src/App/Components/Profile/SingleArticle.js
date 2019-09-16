import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import ReactHtmlParser from 'react-html-parser';
import ReactImageFallback from 'react-image-fallback';
import propTypes from 'prop-types';
import Delete from './DeleteModal';
import countRating from '../../../Helpers/countRating';

export default function SingleArticle(props) {
  const { article, owner, deleteArticleAction } = props;
  return (
    <div key={article.id} className="row single-article mt-4">
      <div className="single-article-header mt-3 row col-12">
        <p className="col-11 single-article-header-left">&nbsp;&nbsp;&nbsp;&nbsp;</p>
        {/* delete modal */}
        {owner && (
          <div>
            <Delete
              id={`deleteModal${article.id}`}
              delete={deleteArticleAction}
              slug={article.slug}
            />
            <div className="btn-group dropleft">
              <i
                className="fa fa-ellipsis-v mt-1 ml-5"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ fontSize: '23px', color: 'black' }}
              />

              <div className="dropdown-menu mt-4">
                <a className="dropdown-item" href={`/articles/${article.slug}/edit`}>
                  Edit
                </a>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  href="/delete"
                  data-toggle="modal"
                  data-target={`#deleteModal${article.id}`}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Link
        className="single-article-link"
        to={
          article.status !== 'draft'
            ? `/articles/${article.slug}`
            : `/articles/${article.slug}/edit?draft=true`
        }
      >
        <ReactImageFallback
          src={article.coverImage}
          fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg"
          className="img-fluid w-100 single-article-image"
          style={{ width: '150px', height: '370px' }}
        />
        <div className="row m-3">
          <h2 className="single-article-title col-10" style={{ fontFamily: 'lato' }}>
            {article.title}
          </h2>
          <p className="mt-2 single-article-read-time">{`${article.readTime} min read`}</p>
        </div>

        <div
          className="m-1 col-12 single-article-content"
          style={{ fontFamily: 'STSong', fontSize: '22px' }}
        >
          <div className="adaptoid">{ReactHtmlParser(article.body.substring(0, 170))}</div>
        </div>
      </Link>
      <div className="row ml-4 mt-4 col-12 single-article-stat">
        <Rater
          total={5}
          rating={article.rating !== 0 ? countRating(article.rating.statistics) : 0}
          interactive={false}
        />
        <p className="ml-5 mb-4 single-article-read">
          reviews:
          {` ${article.rating.allUsers || 0}`}
        </p>
        <p className={`single-article-status-${article.status}`}>
          {' '}
          <span className={`${article.status === 'published' ? 'text-success' : 'text-danger'}`}>
            {`${article.status}: `}
          </span>
          {' '}
          {moment(article.createdAt).format('MMM YYYY')}
        </p>
      </div>
    </div>
  );
}

SingleArticle.propTypes = {
  article: propTypes.object,
  owner: propTypes.bool,
  deleteArticleAction: propTypes.func.isRequired
};
