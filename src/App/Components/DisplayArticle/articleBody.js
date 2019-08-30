import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import Tags from './tags';

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
    tags
  } = props;
  const formattedDate = moment(createdAt).format('Do MMM YYYY');
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div className="article__data">
        <h2 className="article__description">{title}</h2>
        <div className="article__profileDetails">
          <ReactImageFallback
            className="article__imgProfile"
            src={profileImage}
            fallbackImage="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="profilePic"
            title="profile"
          />
          <p to="/" className="article__nameDetails">{`${firstName} ${lastName}`}</p>
          <p to="/" className="article__dateDetails">
            {formattedDate}
          </p>
          <div className="article__point-separator"> . </div>
          <p to="/" className="article__minDetails">
            {readTime}
            {' '}
min read
          </p>
        </div>
        <div className="DraftEditor-root">
          <div className="DraftEditor-editorContainer">
            <div className="ml-0.5">
              {
                <ReactImageFallback
                  className="DraftEditor-coverImage ml-1"
                  src={coverImage}
                  fallbackImage="https://ielektro.es/wp-content/uploads/2017/04/ventajas-comprar-LED.jpg"
                  alt="coverImage"
                />
              }
            </div>
            <div className="public-DraftEditor-content">{ReactHtmlParser(body)}</div>
          </div>
        </div>
        <Tags tags={tags} />
      </div>
    </div>
  );
};

export default ArticleBody;
