import types from './index';
import axios from '../../configs/axios';

const {
  GET_ARTICLE,
  GET_ARTICLE_TAGS,
  ARTICLE_NOT_FOUND,
  ARTICLE_TAGS_NOT_FOUND,
  GET_DRAFTED_ARTICLE
} = types;

const token = localStorage.getItem('token');

export default {
  getArticleDetail: slug => (dispatch) => {
    axios
      .get(`/api/articles/${slug}`)
      .then((res) => {
        dispatch({
          type: GET_ARTICLE,
          payload: res.data.article
        });
      })
      .catch((err) => {
        const message = err.response.data.errors.Article;
        dispatch({ type: ARTICLE_NOT_FOUND, payload: message });
      });
  },
  getDraftedArticle: slug => (dispatch) => {
    axios
      .get(`api/articles/drafts/${slug}`, { headers: { Authorization: token } })
      .then((res) => {
        dispatch({ type: GET_DRAFTED_ARTICLE, payload: res.data.article });
      })
      .catch((error) => {
        const message = error.response.data.errors.slug;
        dispatch({ type: ARTICLE_NOT_FOUND, payload: message });
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
      })
      .catch((err) => {
        const error = err.response.data.errors;
        dispatch({ type: ARTICLE_TAGS_NOT_FOUND, payload: error });
      });
  }
};
