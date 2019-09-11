/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Inloader from '../Common/InlineLoader';
import ArticleCard from './ArticleCard';

function RecentlyAdded({ randomArticles }) {
  return randomArticles ? (
    <Fragment>
      <div className="recent-header">
        <div className="recent-header__categories">
          {randomArticles
            ? [...new Set(randomArticles.map(item => item.Category.name.toLowerCase()))].map((category, index) => (
              <div key={index} className={`category-block category-color__${category}`} />
            ))
            : ''}
          <h3 className="ml-2">Recently added</h3>
        </div>
        <hr />
      </div>
      <div className="recent-articles">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="article-card big-image">
              <img
                src={randomArticles ? randomArticles[0].coverImage : ''}
                alt=""
                className="article-card__image"
              />
              <div className="article-card__content">
                <p className="article-card__content--title">
                  <Link
                    to={randomArticles ? `/articles/${randomArticles[0].slug}` : ''}
                    className="title-link"
                  >
                    {randomArticles ? randomArticles[0].title : ''}
                  </Link>
                </p>
                <div className="article-card__content--category">
                  <div
                    className={`category-block category-color__${
                      randomArticles ? randomArticles[0].Category.name.toLowerCase() : 'default'
                    }`}
                  />
                  <div className="category-name">
                    {randomArticles ? randomArticles[0].Category.name : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            {randomArticles
              ? randomArticles
                .slice(0, 3)
                .map((item, index) => (
                  <ArticleCard
                    key={item.id}
                    article={randomArticles[index + 1]}
                    truncateLevel="high"
                  />
                ))
              : ''}
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Inloader />
  );
}

export default RecentlyAdded;
