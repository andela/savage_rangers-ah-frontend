import React from 'react';
import ReactFallbackImage from 'react-image-fallback';
import { format } from 'timeago.js';
import CommentIcons from './comment.icons';
import useEdit from './useEdit';
import replyBody from './replyBody';
import configs from '../../../configs/urls';

const ReplyComment = ({
  isHidden, replies, replyCommentBody, slug, id, username, profileImage
}) => {
  const { isEditable, edit } = useEdit();
  const { content, changeContentValue } = replyBody();

  const replyComment = () => {
    replyCommentBody(slug, content, id);
    changeContentValue('');
  };

  return (
    <div className="reply-holder-div">
      {isHidden
        && (
          <div className="reply-input">
            <a href={`/profile/${username}`}><ReactFallbackImage className="rounded-circle comment-reply__writer-image" src={profileImage} fallbackImage={configs.defaultUserProfileImage} alt="Generic placeholder" /></a>
            <textarea
              type="textarea"
              name="Reply-content"
              className="reply-input__text-body ml-3"
              placeholder="type your reply message..."
              value={content}
              onChange={({ target }) => changeContentValue(target.value)}
            />
            <button className="reply-input__reply-button" type="submit" onClick={replyComment}>Reply</button>
          </div>
        )
      }

      {
        replies ? replies.map(item => (
          (isHidden ? (
            <div style={{ width: '550px' }} key={item.id}>
              <div className="media comment-reply">
                <a href={`/profile/${username}`}><ReactFallbackImage className="mr-3 rounded-circle comment-reply__writer-image" src={profileImage} fallbackImage={configs.defaultUserProfileImage} alt="Generic placeholder" /></a>
                <div className="media-body comment-reply__holder">
                  <h5 className="mt-0 comment-body__writer-name">
                    <a href={`/profile/${username}`} className="comment-body__writer-name">{username}</a>
                    <small className="comment-body__timestamp">{format(new Date(item.createdAt))}</small>
                  </h5>
                  {
                    isEditable ? (
                      <div>
                        <textarea className="comment-reply__textarea-reply" defaultValue={item.body} />
                        <button type="submit" className="comment-body__update-button">save</button>
                      </div>
                    ) : <p className="comment-body__text-comment">{item.body}</p>
                  }
                  <CommentIcons edit={edit} />
                </div>
              </div>
            </div>

          ) : null)
        )) : null
      }
    </div>
  );
};

export default ReplyComment;
