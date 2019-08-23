import async from 'async';
import { GET_ARTICLES, ARTICLES_ERROR } from './GET_ARTICLES';
import axios from '../../configs/axios';

export default {
  getArticles: () => dispatch => axios
    .get('/api/articles')
    .then((res) => {
      const articles = res.data.result.Articles;
      async.each(articles,
        async (article, callback) => {
          await axios.get(`/api/articles/${article.slug}/stats`).then((response) => {
            articles[articles.indexOf(article)].stats = response.data.article.stats;
          });
          await axios
            .get(`/api/articles/${article.slug}/ratings/statistics`)
            .then((response) => {
              articles[articles.indexOf(article)].rating = response.data.data;
            })
            .catch(() => {
              articles[articles.indexOf(article)].rating = { allUsers: 0, statistics: [] };
            });
          callback();
        },
        () => {
          dispatch({ type: GET_ARTICLES, articlesData: articles });
        });
    })
    .catch((error) => {
      dispatch({ type: ARTICLES_ERROR, error });
    })
};
