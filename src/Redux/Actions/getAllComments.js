import types from './index';
import axios from '../../configs/axios';


const {
  GET_ALL_ARTICLE_COMMENTS,
  CATCH_ERROR,
  POST_COMMENT,
  POST_COMMENT_REPLY,
  UPDATE_COMMENT
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
          type: CATCH_ERROR,
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
        type: CATCH_ERROR,
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
        type: CATCH_ERROR,
        payload: error.errors
      });
    }
    return null;
  }
};
