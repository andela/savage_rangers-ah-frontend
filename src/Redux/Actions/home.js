import each from 'async/each';
import axios from '../../configs/axios';
import types from '.';

const {
  GET_NAV_CATEGORIES,
  GET_NAV_CATEGORIES_ERROR,
  GET_ARTICLES_BY_CATEGORY,
  GET_RANDOM_ARTICLES,
  GET_RANDOM_ARTICLES_ERROR
} = types;

export default {
  getCategories: () => (dispatch) => {
    axios
      .get('/api/articles/categories')
      .then(res => dispatch({ type: GET_NAV_CATEGORIES, payload: res.data }))
      .catch(error => dispatch({ type: GET_NAV_CATEGORIES_ERROR, payload: error }));
  },
  getArticlesByCategory: categories => (dispatch) => {
    let articles = [];
    each(categories,
      (category, callback) => {
        axios.get(`/api/articles/category/${category.id}?limit=2`).then((res) => {
          articles = [...articles, res.data.data];
          callback();
        });
      },
      () => {
        dispatch({ type: GET_ARTICLES_BY_CATEGORY, payload: articles });
      });
  },

  getRandomArticles: () => (dispatch) => {
    axios
      .get('/api/articles?limit=5')
      .then(res => dispatch({ type: GET_RANDOM_ARTICLES, payload: res.data.result.Articles }))
      .catch(error => dispatch({ type: GET_RANDOM_ARTICLES_ERROR, payload: error }));
  }
};
