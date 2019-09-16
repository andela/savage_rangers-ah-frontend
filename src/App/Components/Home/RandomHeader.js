/* eslint-disable react/no-typos */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Inloader from '../Common/InlineLoader';

function RandomHeader({ randomArticles }) {
  return randomArticles ? (
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
      <div className="col-xl-3 col-lg-3">
        <div className="article-card article-card-small small-image">
          <img
            src={randomArticles ? randomArticles[1].coverImage : ''}
            alt=""
            className="article-card__image"
          />
          <div className="article-card__content">
            <p className="article-card__content--title">
              <Link
                to={randomArticles ? `/articles/${randomArticles[1].slug}` : ''}
                className="title-link"
              >
                {randomArticles ? randomArticles[1].title : ''}
              </Link>
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
              <Link
                to={randomArticles ? `/articles/${randomArticles[2].slug}` : ''}
                className="title-link"
              >
                {randomArticles ? randomArticles[2].title : ''}
              </Link>
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
              <Link
                to={randomArticles ? `/articles/${randomArticles[3].slug}` : ''}
                className="title-link"
              >
                {randomArticles ? randomArticles[3].title : ''}
              </Link>
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
              <Link
                to={randomArticles ? `/articles/${randomArticles[4].slug}` : ''}
                className="title-link"
              >
                {randomArticles ? randomArticles[4].title : ''}
              </Link>
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
  ) : (
    <Inloader />
  );
}

RandomHeader.PropTypes = { randomArticles: PropTypes.array };

export default RandomHeader;
