/* eslint-disable react/no-array-index-key */
import React from 'react';
import ArticleCard from './ArticleCard';
import Inloader from '../Common/InlineLoader';

function CategorizeArticles({ articles }) {
  return articles ? (
    <div className="row">
      <div className="col-xl-6 col-lg-6">
        <div className="category-section">
          <div className="category-section__header">
            <div
              className={`category-block category-color__${
                articles ? articles[0][0].Category.name.toLowerCase() : 'default'
              }`}
            />
            <h3 className="ml-3">{articles ? articles[0][0].Category.name : ''}</h3>
          </div>
          <hr />
          {articles
            ? articles[0].map((item, index) => (
              <ArticleCard article={item} key={index} truncateLevel="high" />
            ))
            : ''}
        </div>
        <div className="category-section mt-4">
          <div className="category-section__header">
            <div
              className={`category-block category-color__${
                articles ? articles[1][0].Category.name.toLowerCase() : 'default'
              }`}
            />
            <h3 className="ml-3">{articles ? articles[1][0].Category.name : ''}</h3>
          </div>
          <hr />
          {articles
            ? articles[1].map((item, index) => (
              <ArticleCard article={item} key={index} truncateLevel="high" />
            ))
            : ''}
        </div>
      </div>
      <div className="col-xl-6 col-lg-6">
        <div className="category-section">
          <div className="category-section__header">
            <div
              className={`category-block category-color__${
                articles ? articles[2][0].Category.name.toLowerCase() : 'default'
              }`}
            />
            <h3 className="ml-3">{articles ? articles[2][0].Category.name : ''}</h3>
          </div>
          <hr />
          {articles
            ? articles[2].map((item, index) => (
              <ArticleCard article={item} key={index} truncateLevel="high" />
            ))
            : ''}
        </div>
        <div className="category-section mt-4">
          <div className="category-section__header">
            <div
              className={`category-block category-color__${
                articles ? articles[3][0].Category.name.toLowerCase() : 'default'
              }`}
            />
            <h3 className="ml-3">{articles ? articles[3][0].Category.name : ''}</h3>
          </div>
          <hr />
          {articles
            ? articles[3].map((item, index) => (
              <ArticleCard article={item} key={index} truncateLevel="high" />
            ))
            : ''}
        </div>
      </div>
    </div>
  ) : (
    <Inloader />
  );
}

export default CategorizeArticles;
