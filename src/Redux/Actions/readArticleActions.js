import types from './index';
import axios from '../../configs/axios';

const { READ_ARTICLE, GET_ARTICLE_TAGS, CATCH_ERROR } = types;

export default {
  readArticle: slug => (dispatch) => {
    axios
      .get(`/api/articles/${slug}`)
      .then((res) => {
        dispatch({
          type: READ_ARTICLE,
          payload: res.data.article
        });
      }).catch((err) => {
        const error = err.response.data.errors;
        dispatch({ type: CATCH_ERROR, payload: error });
      });
  },
  getTags: slug => (dispatch) => {
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
