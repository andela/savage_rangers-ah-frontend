import React, { useState } from 'react';
import ReactFallBackImage from 'react-image-fallback';
import { format } from 'timeago.js';
import ReplyComment from './reply.comment.body';
import CommentIcons from './comment.icons';
import useReply from './useReply';
import useEdit from './useEdit';
import replyBody from './replyBody';
import configs from '../../../configs/urls';


const CommentBody = ({
  body,
  createdAt,
  username,
  profileImage,
  replies,
  reactionCount,
  replyCommentBody,
  slug,
  id,
  commentReaction,
  modifyComment,
  removeComment,
  reportComment,
  loggedInUsername,
  loggedInProfileImage
}) => {
  const { isHidden, toggle } = useReply();
  const { isEditable, edit } = useEdit();
  const { content, changeContentValue } = replyBody();
  const [newCommentBody, setNewCommentBody] = useState('');
  return (
    <div>
      <div className="media comment-body" style={{ marginTop: '70px' }}>
        <ReactFallBackImage className="mr-3 rounded-circle comment-body__writer-image" src={profileImage} fallbackImage={configs.defaultUserProfileImage} alt="comment-writer" />
        <div className="media-body">
          <h5 className="mt-0">
            <a href={`/profile/${username}`} className="comment-body__writer-name">{username}</a>
            <small className="comment-body__timestamp">{format(new Date(createdAt))}</small>
          </h5>
          {
            isEditable ? (
              <div>
                <textarea
                  className="comment-body__textarea-comment"
                  value={newCommentBody}
                  onChange={({ target }) => setNewCommentBody(target.value)}
                  placeholder="modify your comment..."
                />
                <button
                  type="submit"
                  className="comment-body__update-button"
                  onClick={() => {
                    modifyComment(slug, id, newCommentBody);
                    edit();
                  }}
                >
                  save

                </button>
              </div>
            ) : (
              <p className="comment-body__text-comment">{body}</p>
            )
          }
          <CommentIcons
            key={id}
            edit={edit}
            commentReaction={commentReaction}
            id={id}
            reactionCount={reactionCount}
            removeComment={removeComment}
            slug={slug}
            reportComment={reportComment}
          />
          <button type="button" className="comment-body__view-more-replies" id="view-replies" onClick={toggle}>
            {!isHidden ? 'View Replies' : 'Hide Replies'}
            {' '}
            {isHidden ? <i className="fas fa-chevron-down" id="chevron-down" /> : <i className="fas fa-chevron-up" />}
          </button>
        </div>
      </div>
      {isHidden
        && (
          <div className="reply-input">
            <a href={`/profile/${username}`}><ReactFallBackImage className="rounded-circle comment-reply__writer-image" src={loggedInProfileImage} fallbackImage={configs.defaultUserProfileImage} alt="Generic placeholder" /></a>
            <textarea
              type="textarea"
              name="Reply-content"
              className="reply-input__text-body ml-3"
              placeholder="type your reply message..."
              value={content}
              onChange={({ target }) => changeContentValue(target.value)}
            />
            <button
              className="reply-input__reply-button"
              type="submit"
              onClick={() => {
                replyCommentBody(slug, content, id);
                changeContentValue('');
              }}
            >
Reply

            </button>
          </div>
        )
      }
      {
        replies ? replies.map(item => (
          <ReplyComment
            key={item.id}
            isHidden={isHidden}
            hide={toggle}
            replies={item}
            replyCommentBody={replyCommentBody}
            slug={slug}
            username={username}
            profileImage={profileImage}
            reactionCount={item.Reactions}
            commentReaction={commentReaction}
            reportComment={reportComment}
            removeComment={removeComment}
            modifyComment={modifyComment}
            loggedInUsername={loggedInUsername}
            loggedInProfileImage={loggedInProfileImage}
          />
        )) : null
      }
    </div>
  );
};


export default CommentBody;
