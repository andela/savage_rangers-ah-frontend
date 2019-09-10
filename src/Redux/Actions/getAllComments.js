import types from './index';
import axios from '../../configs/axios';


const {
  GET_ALL_ARTICLE_COMMENTS,
  CATCH_COMMENT_ERROR,
  POST_COMMENT,
  POST_COMMENT_REPLY,
  UPDATE_COMMENT,
  LIKE_DISLIKE_COMMENT_REACTION,
  LIKE_DISLIKE_COUNT
} = types;

const token = localStorage.getItem('token');

export default {
  getAllComments: (slug, limit) => (dispatch) => {
    axios.get(`/api/articles/${slug}/comments?offset=0&&limit=${limit}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_ARTICLE_COMMENTS,
          payload: res.data.data
        });
      }).catch((err) => {
        dispatch({
          type: CATCH_COMMENT_ERROR,
          payload: err.errors
        });
      });
  },

  postComment: (slug, body) => async (dispatch) => {
    try {
      const { data: response } = await axios.post(`/api/articles/${slug}/comments`, { body }, { headers: { Authorization: token } });
      dispatch({
        type: POST_COMMENT,
        payload: response
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: error.errors
      });
    }
    return [];
  },

  updateComment: comment => (dispatch) => {
    dispatch({
      type: UPDATE_COMMENT,
      payload: comment
    });
  },

  postCommentReply: (slug, body, parentCommentId) => async (dispatch) => {
    try {
      const { data: response } = await axios.post(`/api/articles/${slug}/comments`, { body, parentCommentId }, { headers: { Authorization: token } });
      dispatch({
        type: POST_COMMENT_REPLY,
        payload: response.data
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: error.errors
      });
    }
    return null;
  },

  likeAndDislikeCommentReaction: (reaction, commentId) => async (dispatch) => {
    const data = {};
    try {
      const response = await axios.post(`/api/comment/${reaction}/${commentId}`, data, { headers: { Authorization: token } });
      dispatch({
        type: LIKE_DISLIKE_COMMENT_REACTION,
        payload: response
      });
    } catch (err) {
      const errorObject = err.response.data.message;
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: errorObject
      });
    }
    return null;
  },
  likeAndDislikeCount: (reaction, commentId) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/comment/${reaction}/${commentId}`, { headers: { Authorization: token } });
      dispatch({
        type: LIKE_DISLIKE_COUNT,
        payload: res
      });
    } catch (err) {
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: err
      });
    }
    return null;
  }
};
