import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Common/NavProfile/navbar';

const ArticleNotFound = (props) => {
  const { content } = props;

  return (
    <React.Fragment>
      <Navbar />
      <div className="not-found-page">
        <h1 className="not-found-page__number">404</h1>
        <p className="not-found-page__text">{content}</p>
        <Link to="/" className="not-found-page__link">Back to Homepage</Link>
      </div>

    </React.Fragment>
  );
};

export default ArticleNotFound;
