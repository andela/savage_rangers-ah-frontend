import React from 'react';
import ReactFallBackImage from 'react-image-fallback';
import { format } from 'timeago.js';
import ReplyComment from './reply.comment.body';
import CommentIcons from './comment.icons';
import useReply from './useReply';
import useEdit from './useEdit';
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
  commentReaction
}) => {
  const { isHidden, toggle } = useReply();
  const { isEditable, edit } = useEdit();
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
                <textarea className="comment-body__textarea-comment" defaultValue={body} />
                <button type="submit" className="comment-body__update-button">save</button>
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
          />
          <button type="button" className="comment-body__view-more-replies" id="view-replies" onClick={toggle}>
            {!isHidden ? 'View Replies' : 'Hide Replies'}
            {' '}
            {isHidden ? <i className="fas fa-chevron-down" id="chevron-down" /> : <i className="fas fa-chevron-up" />}
          </button>
        </div>
      </div>
      <ReplyComment
        key={id}
        isHidden={isHidden}
        hide={toggle}
        replies={replies}
        replyCommentBody={replyCommentBody}
        slug={slug}
        id={id}
        username={username}
        profileImage={profileImage}
        reactionCount={reactionCount}
        commentReaction={commentReaction}
      />
    </div>
  );
};


export default CommentBody;
