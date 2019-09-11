import React from 'react';
import htmlparser from 'react-html-parser';
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
            <div className="article-layout__title">{article.title}</div>
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
            {truncateLevel === 'high' ? htmlparser(`${article.body.substring(0, 150)}.....`) : ''}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="article-layout__profile">
                <div className="article-layout__profile--image">
                  <img
                    src={article ? article.User.profileImage : defaultUserProfileImage}
                    alt="profile"
                  />
                </div>
                <div className="article-layout__profile--detail ml-3 pt-2">
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
