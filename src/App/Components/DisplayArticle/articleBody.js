import React, { useState } from 'react';
import ReactImageFallback from 'react-image-fallback';
import ReactHtmlParser from 'react-html-parser';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Tags from './tags';
import configs from '../../../configs/urls';
import Bookmark from '../Common/Bookmark/Bookmark';

const ArticleBody = (props) => {
  const {
    title,
    body,
    readTime,
    createdAt,
    coverImage,
    firstName,
    lastName,
    profileImage,
    tags,
    username,
    authorCredential,
    bookmarks,
    slug
  } = props;

  const [highlightedText, setHighlightedText] = useState('');

  const getSelectionText = () => {
    let selected = '';
    if (window.getSelection) {
      selected = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
      selected = document.selection.createRange().text;
    }
    return selected;
  };

  const formattedDate = moment(createdAt).format('Do MMM YYYY');
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="article__data">
        <h2 className="article__description">
          {title}
          {authorCredential.isAuthor ? (
            <Link to={`/articles/${authorCredential.slug}/edit`} className="btn-author">
              <i className="fas fa-pencil-alt" />
            </Link>
          ) : (
            ' '
          )}
        </h2>
        <div className="article__profileDetails">
          <ReactImageFallback
            className="article__imgProfile"
            src={profileImage}
            fallbackImage={configs.defaultUserProfileImage}
            alt="profilePic"
            title="profile"
          />
          <p to="/" className="article__nameDetails">
            {firstName ? `${firstName} ${lastName}` : `${username}`}
          </p>
          <p to="/" className="article__dateDetails">
            {formattedDate}
          </p>
          <div className="article__point-separator"> . </div>
          <p to="/" className="article__minDetails">
            {readTime}
            {' '}
min read
          </p>
          {username && <Bookmark username={username} slug={slug} bookmarks={bookmarks} />}
        </div>
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <div className="DraftEditor-root article-body">
          <div className="DraftEditor-editorContainer article-body__container">
            <div className="ml-0.5 article-body__container--image">
              {
                <ReactImageFallback
                  className="DraftEditor-coverImage ml-1"
                  src={coverImage}
                  fallbackImage={configs.defaultCoverImage}
                  alt="coverImage"
                />
              }
            </div>
            <div className="public-DraftEditor-content article-body__container--content">
              {ReactHtmlParser(body)}
            </div>
            <div className="public-DraftEditor-content">{ReactHtmlParser(body)}</div>
          </div>
        </div>
        <Tags tags={tags} />
      </div>
    </div>
  );
};

ArticleBody.propTypes = {
  username: propTypes.string,
  authorCredential: propTypes.object,
  bookmarks: propTypes.array,
  slug: propTypes.string
};
export default ArticleBody;
