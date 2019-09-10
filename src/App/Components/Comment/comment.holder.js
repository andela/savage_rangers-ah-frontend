import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactFallbackImage from 'react-image-fallback';
import CommentBody from './parent.comment.body';
import actions from '../../../Redux/Actions/getAllComments';
import configs from '../../../configs/urls';

const {
  getAllComments,
  postComment,
  updateComment,
  postCommentReply,
  likeAndDislikeCommentReaction
} = actions;

export const CommentHolder = ({
  getAllComments: getComments,
  postComment: createComment,
  updateComment: newComment,
  postCommentReply: replyComment,
  slug,
  likeAndDislikeCommentReaction: commentReaction
}) => {
  const data = useSelector(state => state.commentsReducer.All_Comments);
  const userData = useSelector(state => state.notifications.profile);
  const extractedData = userData.profile || '';
  const [commentText, setComment] = useState('');
  const [limit, setLimit] = useState(5);

  const submitReaction = async (reaction, commentId) => {
    await commentReaction(reaction, commentId);
    getComments(slug, limit);
  };


  const submitReplies = async (slugText, replyText, id) => {
    await replyComment(slugText, replyText, id);
    getComments(slugText, limit);
  };

  const submitComment = async (e) => {
    const checkAuth = localStorage.getItem('token');
    if (checkAuth) {
      e.preventDefault();
      const datacamp = await createComment(slug, commentText);
      newComment(datacamp);
      setComment('');
      await getComments(slug, limit);
    } else {
      toast.success('Please, Login in first and comeback');
    }
  };


  const fetchMoreData = () => {
    setLimit(limit + 10);
    getComments(slug, limit);
  };

  useEffect(() => {
    getComments(slug, limit);
  }, [getComments]);

  return (
    <div className="comment-holder mt-5">
      <ToastContainer />
      <div className="comment-holder__title ml-4">
        <h3 style={{ fontSize: '25px' }}>COMMENTS</h3>
        <div className="parent-reply-input">
          <a href={`/profile/${extractedData.username}`}><ReactFallbackImage className="rounded-circle comment-body__writer-image" src={extractedData.profileImage} fallbackImage={configs.defaultUserProfileImage} alt="Generic placeholder" /></a>
          <textarea
            type="textarea"
            name="Reply-content"
            className="parent-reply-input__text-body ml-3"
            placeholder="type your comment..."
            value={commentText}
            onChange={({ target }) => setComment(target.value)}
          />
          <button className="parent-reply-input__reply-button" type="submit" onClick={submitComment}>Comment</button>
        </div>
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore
          style={{ height: '70rem', overflow: 'scroll' }}
        >
          {

            data ? data.map(item => (
              <CommentBody
                key={item.id}
                slug={slug}
                id={item.id}
                body={item.body}
                createdAt={item.createdAt}
                username={item.User ? item.User.username : null}
                profileImage={item.User ? item.User.profileImage : null}
                replies={item.Replies}
                reactionCount={item.Reactions}
                replyCommentBody={submitReplies}
                commentReaction={submitReaction}
              />
            )) : null
          }
        </InfiniteScroll>

      </div>
    </div>
  );
};

export default connect(null, {
  getAllComments,
  postComment,
  updateComment,
  postCommentReply,
  likeAndDislikeCommentReaction
})(CommentHolder);
