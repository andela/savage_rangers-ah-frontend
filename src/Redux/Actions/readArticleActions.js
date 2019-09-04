import types from './index';
import axios from '../../configs/axios';

const { FETCH_ONE_ARTICLE, GET_ARTICLE_TAGS, READ_ARTICLE_ERROR } = types;

export default {
  readArticle: slug => (dispatch) => {
    axios
      .get(`/api/articles/${slug}`)
      .then((res) => {
        dispatch({
          type: FETCH_ONE_ARTICLE,
          payload: res.data.article
        });
      }).catch((err) => {
        const error = err.response.data.errors.Article;
        dispatch({ type: READ_ARTICLE_ERROR, payload: error });
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
        const error = err.response.data.errors.tags;
        dispatch({ type: READ_ARTICLE_ERROR, payload: error });
      });
  }
};
