import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactFallbackImage from 'react-image-fallback';
import CommentBody from './parent.comment.body';
import LoginFirst from '../Common/LoginFirstToast';
import actions from '../../../Redux/Actions/getAllComments';
import configs from '../../../configs/urls';

const {
  getAllComments,
  postComment,
  updateComment,
  postCommentReply,
  likeAndDislikeCommentReaction,
  editComment,
  deleteComment,
  reportComment
} = actions;

const CommentHolder = ({
  getAllComments: getComments,
  postComment: createComment,
  updateComment: newComment,
  postCommentReply: replyComment,
  slug,
  likeAndDislikeCommentReaction: commentReaction,
  history,
  editComment: modifyComment,
  deleteComment: removeComment,
  reportComment: report
}) => {
  const data = useSelector(state => state.commentsReducer.All_Comments);
  const error = useSelector(state => state.commentsReducer.Error);
  const userData = useSelector(state => state.notifications.profile);
  const extractedData = userData.profile || '';
  const [commentText, setComment] = useState('');
  const [limit, setLimit] = useState(5);
  const checkAuth = localStorage.getItem('token');

  if (error) toast.warn(error);

  const goToLogin = () => {
    history.replace(`/login?redirect=${document.location.pathname}`);
  };

  const submitReaction = async (reaction, commentId) => {
    if (checkAuth) {
      await commentReaction(reaction, commentId, checkAuth);
      getComments(slug, limit);
    } else {
      toast.success(<LoginFirst redirectToLogin={goToLogin} />);
    }
  };

  const submitReplies = async (slugText, replyText, id) => {
    await replyComment(slugText, replyText, id, checkAuth);
    getComments(slugText, limit);
  };

  const submitNewComment = async (editSlug, body, id) => {
    await modifyComment(editSlug, body, id, checkAuth);
    getComments(slug, limit);
  };

  const eraseComment = async (dltSlug, id) => {
    await removeComment(dltSlug, id, checkAuth);
    getComments(slug, limit);
  };

  const submitReport = async (reportSlug, id, commentReason) => {
    await report(reportSlug, id, commentReason, checkAuth);
  };

  const submitComment = async (e) => {
    if (checkAuth) {
      e.preventDefault();
      const datacamp = await createComment(slug, commentText, checkAuth);
      newComment(datacamp);
      setComment('');
      await getComments(slug, limit);
    } else {
      toast.success(<LoginFirst redirectToLogin={goToLogin} />);
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
      <div className="comment-holder__title ml-4">
        <h3 style={{ fontSize: '25px' }}>
          COMMENTS &nbsp;
          {data.length}
        </h3>
        <div className="parent-reply-input">
          <a href={`/profile/${extractedData.username}`}>
            <ReactFallbackImage
              className="rounded-circle comment-body__writer-image"
              src={extractedData.profileImage}
              fallbackImage={configs.defaultUserProfileImage}
              alt="Generic placeholder"
            />
          </a>
          <textarea
            type="textarea"
            name="Reply-content"
            className="parent-reply-input__text-body ml-3"
            placeholder="type your comment..."
            value={commentText}
            onChange={({ target }) => setComment(target.value)}
          />
          <button
            className="parent-reply-input__reply-button"
            type="submit"
            onClick={submitComment}
          >
            Comment
          </button>
        </div>
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore
          style={{ 'max-height': '70rem', overflow: 'scroll' }}
        >
          {data
            ? data.map(item => (
              <CommentBody
                key={item.id}
                slug={slug}
                id={item.id}
                body={item.body}
                createdAt={item.createdAt}
                username={item.User ? item.User.username : null}
                profileImage={item.User ? item.User.profileImage : null}
                loggedInUsername={extractedData.username}
                loggedInProfileImage={extractedData.profileImage}
                replies={item.Replies}
                reactionCount={item.Reactions}
                replyCommentBody={submitReplies}
                commentReaction={submitReaction}
                modifyComment={submitNewComment}
                removeComment={eraseComment}
                reportComment={submitReport}
              />
            ))
            : null}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default connect(null,
  {
    getAllComments,
    postComment,
    updateComment,
    postCommentReply,
    likeAndDislikeCommentReaction,
    editComment,
    deleteComment,
    reportComment
  })(CommentHolder);
