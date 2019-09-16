import React, { useState } from 'react';
import ReactFallbackImage from 'react-image-fallback';
import { format } from 'timeago.js';
import CommentIcons from './comment.icons';
import useEdit from './useEdit';
import configs from '../../../configs/urls';

const ReplyComment = ({
  isHidden,
  replies,
  slug,
  commentReaction,
  modifyComment,
  removeComment,
  reportComment,
  reactionCount,
  loggedInUsername,
  loggedInProfileImage
}) => {
  const { isEditable, edit } = useEdit();
  const [newReplyBody, setNewReplyBody] = useState('');
  const replyId = replies.id;

  return (
    <div className="reply-holder-div">


      {
        isHidden ? (
          <div style={{ width: '550px' }} key={replies.id}>
            <div className="media comment-reply">
              <a href={`/profile/${loggedInUsername}`}><ReactFallbackImage className="mr-3 rounded-circle comment-reply__writer-image" src={loggedInProfileImage} fallbackImage={configs.defaultUserProfileImage} alt="Generic placeholder" /></a>
              <div className="media-body comment-reply__holder">
                <h5 className="mt-0 comment-body__writer-name">
                  <a href={`/profile/${loggedInUsername}`} className="comment-body__writer-name">{loggedInUsername}</a>
                  <small className="comment-body__timestamp">{format(new Date(replies.createdAt))}</small>
                </h5>
                {
                  isEditable ? (
                    <div>
                      <textarea
                        className="comment-reply__textarea-reply"
                        value={newReplyBody}
                        placeholder="modify your reply..."
                        onChange={({ target }) => setNewReplyBody(target.value)}
                      />
                      <button
                        type="submit"
                        className="comment-body__update-button-reply"
                        onClick={() => {
                          modifyComment(slug, replyId, newReplyBody);
                          edit();
                        }}
                      >
                        save

                      </button>
                    </div>
                  ) : <p className="comment-body__text-comment">{replies.body}</p>
                }
                <CommentIcons
                  key={replyId}
                  edit={edit}
                  id={replyId}
                  reactionCount={reactionCount}
                  commentReaction={commentReaction}
                  reportComment={reportComment}
                  removeComment={removeComment}
                  modifyComment={modifyComment}
                  slug={slug}
                />
              </div>
            </div>
          </div>

        ) : null
      }
    </div>
  );
};

export default ReplyComment;
