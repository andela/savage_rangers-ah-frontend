import types from './index';
import axios from '../../configs/axios';

const { GET_ARTICLE, GET_ARTICLE_TAGS, CATCH_ERROR } = types;

export default {
  getArticleDetail: slug => (dispatch) => {
    axios
      .get(`/api/articles/${slug}`)
      .then((res) => {
        dispatch({
          type: GET_ARTICLE,
          payload: res.data.article
        });
      }).catch((err) => {
        const error = err.response.data.errors;
        dispatch({ type: CATCH_ERROR, payload: error });
      });
  },
  getArticleTags: slug => (dispatch) => {
    axios
      .get(`/api/articles/${slug}/tags`)
      .then((res) => {
        dispatch({
          type: GET_ARTICLE_TAGS,
          payload: res.data
        });
      }).catch((err) => {
        const error = err.response.data.errors;
        dispatch({ type: CATCH_ERROR, payload: error });
      });
  }
};
