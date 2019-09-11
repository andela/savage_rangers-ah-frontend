/* eslint-disable react/no-typos */
import React from 'react';
import PropTypes from 'prop-types';

function RandomHeader({ randomArticles }) {
  return (
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
              {randomArticles ? randomArticles[0].title : ''}
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
      <div className="col-xl-3 col-lg-3">
        <div className="article-card article-card-small small-image">
          <img
            src={randomArticles ? randomArticles[1].coverImage : ''}
            alt=""
            className="article-card__image"
          />
          <div className="article-card__content">
            <p className="article-card__content--title">
              {randomArticles ? randomArticles[1].title : ''}
            </p>
            <div className="article-card__content--category">
              <div
                className={`category-block category-color__${
                  randomArticles ? randomArticles[1].Category.name.toLowerCase() : 'default'
                }`}
              />
              <div className="category-name">
                {randomArticles ? randomArticles[1].Category.name : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="article-card article-card-small small-image">
          <img
            src={randomArticles ? randomArticles[2].coverImage : ''}
            alt=""
            className="article-card__image"
          />
          <div className="article-card__content">
            <p className="article-card__content--title">
              {randomArticles ? randomArticles[2].title : ''}
            </p>
            <div className="article-card__content--category">
              <div
                className={`category-block category-color__${
                  randomArticles ? randomArticles[2].Category.name.toLowerCase() : 'default'
                }`}
              />
              <div className="category-name">
                {randomArticles ? randomArticles[2].Category.name : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3">
        <div className="article-card article-card-small small-image">
          <img
            src={randomArticles ? randomArticles[3].coverImage : ''}
            alt=""
            className="article-card__image"
          />
          <div className="article-card__content">
            <p className="article-card__content--title">
              {randomArticles ? randomArticles[3].title : ''}
            </p>
            <div className="article-card__content--category">
              <div
                className={`category-block category-color__${
                  randomArticles ? randomArticles[3].Category.name.toLowerCase() : 'default'
                }`}
              />
              <div className="category-name">
                {randomArticles ? randomArticles[3].Category.name : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="article-card article-card-small small-image">
          <img
            src={randomArticles ? randomArticles[4].coverImage : ''}
            alt=""
            className="article-card__image"
          />
          <div className="article-card__content">
            <p className="article-card__content--title">
              {randomArticles ? randomArticles[4].title : ''}
            </p>
            <div className="article-card__content--category">
              <div
                className={`category-block category-color__${
                  randomArticles ? randomArticles[4].Category.name.toLowerCase() : 'default'
                }`}
              />
              <div className="category-name">
                {randomArticles ? randomArticles[4].Category.name : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RandomHeader.PropTypes = { randomArticles: PropTypes.array };

export default RandomHeader;
