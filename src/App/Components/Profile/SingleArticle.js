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
        <p className="col-11 single-article-header-left">
          {moment(article.createdAt).format('MMM YYYY')}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {`${article.readTime} min read`}
        </p>
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
                <a
                  className="dropdown-item"
                  href={`articles/${article.slug}/edit`}>
                  Edit
                </a>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  href="/delete"
                  data-toggle="modal"
                  data-target={`#deleteModal${article.id}`}>
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
            : `/update/article/${article.slug}`
        }>
        <ReactImageFallback
          src={article.coverImage}
          fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg"
          className="img-fluid w-100 single-article-image"
          style={{ width: '150px', height: '370px' }}
        />
        <h2 className="m-3 single-article-title" style={{ fontFamily: 'lato' }}>
          {article.title}
        </h2>
        <div
          className="m-1 col-12 single-article-content"
          style={{ fontFamily: 'STSong', fontSize: '22px' }}>
          <div className="adaptoid">
            {ReactHtmlParser(article.body.substring(0, 170))}
          </div>
        </div>
      </Link>
      <div className="row ml-4 mt-4 col-12 single-article-stat">
        <Rater
          total={5}
          rating={
            article.rating !== 0 ? countRating(article.rating.statistics) : 0
          }
          interactive
        />
        <p className="ml-5 mb-4 single-article-read">
          [{article.rating.allUsers || 0}/{article.statistics.stats.reads}]
        </p>
        <p className="single-article-status">
          {' '}
          <span
            className={`${
              article.status === 'published' ? 'text-success' : 'text-danger'
            }`}>
            {article.status}
          </span>{' '}
        </p>
      </div>
    </div>
  );
}

SingleArticle.propTypes = {
  article: propTypes.object.isRequired,
  owner: propTypes.bool.isRequired,
  deleteArticleAction: propTypes.func.isRequired
};
