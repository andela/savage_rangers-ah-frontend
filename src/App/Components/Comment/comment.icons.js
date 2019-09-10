import React from 'react';

const CommentIcons = ({
  edit,
  commentReaction,
  id,
  reactionCount
}) => (
  <div className="comment-icons" key={id}>
    {
        reactionCount && reactionCount.length > 0 ? reactionCount.map(item => (
          <div key={item}>
            <button className="comment-icons__dislike-comment" type="button" title="dislike" onClick={() => commentReaction('dislikes', id)}>
              <i className="fas fa-heart-broken" id="dislike" />
              {' '}
              <small id="number">{item.dislikes}</small>
            </button>

            <button className="comment-icons__dislike-comment ml-2" title="like" onClick={() => commentReaction('likes', id)} type="button">
              <i className="fas fa-heart" id="like" />
              {' '}
              <small id="number">{item.likes}</small>
            </button>
          </div>
        )) : (
          <div>
            <button className="comment-icons__dislike-comment" type="button" title="dislike" onClick={() => commentReaction('dislikes', id)}>
              <i className="fas fa-heart-broken" id="dislike" />
              {' '}
              <small id="number">0</small>
            </button>

            <button className="comment-icons__dislike-comment ml-2" title="like" onClick={() => commentReaction('likes', id)} type="button">
              <i className="fas fa-heart" id="like" />
              {' '}
              <small id="number">0</small>
            </button>
          </div>
        )
      }
    <button className="comment-icons__dislike-comment ml-2" title="report" type="button">
      <i className="fas fa-flag" id="report" />
      {' '}
      <small id="number">100</small>
    </button>

    <button className="comment-icons__dislike-comment ml-2" title="edit" onClick={edit} type="button">
      <i className="fas fa-edit" id="edit" />
    </button>

    <button className="comment-icons__dislike-comment ml-2" title="delete" type="button">
      <i className="fas fa-trash" id="delete" />
    </button>
  </div>
);

export default CommentIcons;
