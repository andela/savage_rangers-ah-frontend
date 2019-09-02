import React from 'react';

const CommentIcons = (props) => {
  const { edit } = props;
  return (
    <div className="comment-icons">
      <div className="comment-icons__dislike-comment" title="dislike">
        <i className="fas fa-heart-broken" id="dislike" />
        {' '}
        <small id="number">69</small>
      </div>

      <div className="comment-icons__dislike-comment ml-2" title="like">
        <i className="fas fa-heart" id="like" />
        {' '}
        <small id="number">69</small>
      </div>

      <div className="comment-icons__dislike-comment ml-2" title="report">
        <i className="fas fa-flag" id="report" />
        {' '}
        <small id="number">69</small>
      </div>

      <div className="comment-icons__dislike-comment ml-2" title="edit" onClick={edit} onKeyDown="" tabIndex="0" role="button">
        <i className="fas fa-edit" id="edit" />
      </div>

      <div className="comment-icons__dislike-comment ml-2" title="delete">
        <i className="fas fa-trash" id="delete" />
      </div>
    </div>
  );
};

export default CommentIcons;
