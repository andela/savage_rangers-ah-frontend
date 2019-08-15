import types from './index';
import axios from '../../configs/axios';

const { GET_POPULAR_ARTICLES } = types;

export default {
  readPopularArticle: () => (dispatch) => {
    axios
      .get('https://authors-heaven.herokuapp.com/api/articles/most/popular')
      .then((res) => {
        dispatch({
          type: GET_POPULAR_ARTICLES,
          payload: res.data
        });
      });
  }
};
