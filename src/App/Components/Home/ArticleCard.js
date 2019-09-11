/* eslint-disable no-return-assign */
import React from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import Img from 'react-image-fallback';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urls from '../../../configs/urls';

const { defaultUserProfileImage, defaultCoverImage } = urls;

function ArticleCard({ article, truncateLevel }) {
  const formattedDate = moment(article.createdAt).format('Do MMM YYYY');
  return article ? (
    <div>
      <div className="row article-layout mb-2">
        <div className="col-lg-4">
          <div className="article-layout__image pt-3">
            <img src={article.coverImage || defaultCoverImage} />
          </div>
        </div>
        <div className="col-lg-8 article-layout-content">
          <div className="article-layout__header">
            <div className="article-layout__title">
              {truncateLevel === 'low' ? (
                <Link
                  style={{ color: 'black' }}
                  className="title-link"
                  to={`/articles/${article.slug}`}
                >
                  {article.title}
                </Link>
              ) : (
                article.title
              )}
            </div>
            <div className="article-layout__category">
              <div
                className={`category-block category-color__${
                  article ? article.Category.name.toLowerCase() : 'default'
                }`}
              />
              <div className="category-name">{article ? article.Category.name : ''}</div>
            </div>
          </div>
          <div className="article-layout__body mt-3">
            {truncateLevel === 'high' ? (
              <HTMLEllipsis
                unsafeHTML={article.body}
                maxLine="2"
                ellipsis="..."
                basedOn="letters"
              />
            ) : (
              ''
            )}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="article-layout__profile">
                <div className="article-layout__profile--image">
                  <Img
                    src={article ? article.User.profileImage : ''}
                    alt="profile"
                    fallbackImage={defaultUserProfileImage}
                  />
                </div>
                <div className="article-layout__profile--detail ml-1 pt-2">
                  <div className="profile-detail__name">
                    <Link to={`/profile/${article ? article.User.username : '/'}`}>
                      {article ? article.User.username : 'default'}
                    </Link>
                  </div>
                  <div className="profile-detail__date">{formattedDate}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pt-2">
              {truncateLevel === 'high' ? (
                <Link className="btn btn-read ml-4" to={`/articles/${article.slug}`}>
                  Read more
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ' '
  );
}

export default ArticleCard;
