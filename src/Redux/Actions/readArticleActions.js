import types from './index';
import axios from '../../configs/axios';

const { READ_ARTICLE, GET_ARTICLE_TAGS } = types;

export default {
  readArticle: slug => (dispatch) => {
    axios
      .get(`https://authors-heaven.herokuapp.com/api/articles/${slug}`)
      .then((res) => {
        dispatch({
          type: READ_ARTICLE,
          payload: res.data.article
        });
      });
  },
  getTags: slug => (dispatch) => {
    axios
      .get(`https://authors-heaven.herokuapp.com/api/articles/${slug}/tags`)
      .then((res) => {
        dispatch({
          type: GET_ARTICLE_TAGS,
          payload: res.data
        });
      });
  }
};
