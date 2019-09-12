import types from './index';
import axios from '../../configs/axios';


const {
  GET_ALL_ARTICLE_COMMENTS,
  CATCH_COMMENT_ERROR,
  POST_COMMENT,
  POST_COMMENT_REPLY,
  UPDATE_COMMENT,
  LIKE_DISLIKE_COMMENT_REACTION,
  LIKE_DISLIKE_COUNT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  REPORT_COMMENT
} = types;

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

  postComment: (slug, body, token) => async (dispatch) => {
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

  postCommentReply: (slug, body, parentCommentId, token) => async (dispatch) => {
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

  likeAndDislikeCommentReaction: (reaction, commentId, token) => async (dispatch) => {
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
  editComment: (slug, id, body, token) => async (dispatch) => {
    try {
      const response = await axios.patch(`/api/articles/${slug}/comments/${id}`, { body }, { headers: { Authorization: token } });
      dispatch({
        type: EDIT_COMMENT,
        payload: response
      });
      return response;
    } catch (err) {
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: err.errors
      });
    }
    return null;
  },
  likeAndDislikeCount: (reaction, commentId, token) => async (dispatch) => {
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
  },

  deleteComment: (slug, id, token) => async (dispatch) => {
    try {
      const response = await axios.delete(`/api/articles/${slug}/comments/${id}`, { headers: { Authorization: token } });
      dispatch({
        type: DELETE_COMMENT,
        payload: response.message
      });
      return response;
    } catch (err) {
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: err.errors
      });
    }
    return null;
  },

  reportComment: (slug, id, commentReason, token) => async (dispatch) => {
    const data = { commentReason };
    try {
      const response = await axios.post(`/api/articles/${slug}/comments/${id}/report`, data, { headers: { Authorization: token } });
      dispatch({
        type: REPORT_COMMENT,
        payload: response.message
      });
      return response;
    } catch (err) {
      const errorObject = err.response.data.errors.Message;
      dispatch({
        type: CATCH_COMMENT_ERROR,
        payload: errorObject
      });
    }
    return null;
  }
};
