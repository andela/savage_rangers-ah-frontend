/* eslint-disable no-param-reassign */
import React, { useState } from 'react';

const CommentIcons = ({
  edit,
  commentReaction,
  id,
  reactionCount,
  removeComment,
  slug,
  reportComment
}) => {
  const [reasonId, setReasonId] = useState(0);
  const commentReason = reasonId;

  reactionCount = reactionCount.length === 1 ? reactionCount : [{
    likes: reactionCount.reduce((sum, next) => sum + next.likes, 0),
    dislikes: reactionCount.reduce((sum, next) => sum + next.dislikes, 0)
  }];

  return (
    <div className="comment-icons" key={id}>
      {
        reactionCount && reactionCount.length > 0 ? reactionCount.map(item => (
          <div key={item.dislikes}>
            <button className="comment-icons__dislike-comment" type="button" title="dislike" onClick={() => commentReaction('dislikes', id)}>
              <i className="fas fa-heart-broken" id="dislike" />
              {' '}
              <small className="count_number">{item.dislikes}</small>
            </button>

            <button className="comment-icons__dislike-comment ml-2" title="like" onClick={() => commentReaction('likes', id)} type="button">
              <i className="fas fa-heart" id="like" />
              {' '}
              <small className="count_number">{item.likes}</small>
            </button>
          </div>
        )) : (
          <div>
            <button className="comment-icons__dislike-comment" type="button" title="dislike" onClick={() => commentReaction('dislikes', id)}>
              <i className="fas fa-heart-broken" id="dislike" />
              {' '}
              <small className="count_number">0</small>
            </button>

            <button className="comment-icons__dislike-comment ml-2" title="like" onClick={() => commentReaction('likes', id)} type="button">
              <i className="fas fa-heart" id="like" />
              {' '}
              <small className="count_number">0</small>
            </button>
          </div>
        )
      }
      <button className="comment-icons__dislike-comment ml-2" title="report" type="button" data-toggle="modal" data-target="#reasonModal">
        <i className="fas fa-flag" id="report" />
        {' '}
      </button>

      <button className="comment-icons__dislike-comment ml-2" title="edit" onClick={edit} type="button">
        <i className="fas fa-edit" id="edit" />
      </button>

      <button className="comment-icons__dislike-comment ml-2" title="delete" type="button" onClick={() => removeComment(slug, id)}>
        <i className="fas fa-trash" id="delete" />
      </button>

      <div className="modal fade" id="reasonModal" tabIndex="-1" role="dialog" aria-labelledby="reasonModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ textAlign: 'center' }}>
              <h5 className="modal-title" id="reasonModalTitle" style={{ fontSize: '24px' }}>Report Reasons</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="radio">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value="1" onClick={({ target }) => setReasonId(target.value)} />
                  It contains violent content
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value="2" onClick={({ target }) => setReasonId(target.value)} />
                  this content exploits the minors
                </label>
              </div>
              <div className="radio disabled">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value="3" onClick={({ target }) => setReasonId(target.value)} />
                  this content is being used for harassment
                </label>
              </div>
              <div className="radio disabled">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value="4" onClick={({ target }) => setReasonId(target.value)} />
                  this content is a spam
                </label>
              </div>
              <div className="radio disabled">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value="5" onClick={({ target }) => setReasonId(target.value)} />
                  this content violates the privacy of someone
                </label>
              </div>
              <div className="radio disabled">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value="6" onClick={({ target }) => setReasonId(target.value)} />
                  this content violates the copyright and trademark infringement
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={
                  () => reportComment(slug, id, commentReason)
                }
              >
                Report

              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};


export default CommentIcons;
