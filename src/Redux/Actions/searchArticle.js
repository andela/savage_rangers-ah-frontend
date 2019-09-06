import async from 'async';
import axios from '../../configs/axios';
import actions from '.';

const { SEARCH_ARTICLE, SEARCH_ERROR } = actions;

export default {
  searchArticles: (filter, input) => (dispatch) => {
    axios
      .get(`api/articles/search?${input}=${filter}`)
      .then((res) => {
        const { articles } = res.data;
        async.each(articles, async (article, callback) => {
          await axios
            .get(`https://authors-heaven.herokuapp.com/api/articles/${article.slug}/stats`)
            .then((response) => {
              articles[articles.indexOf(article)].stats = response.data.article.stats;
            });
          await axios
            .get(`https://authors-heaven.herokuapp.com/api/articles/${article.slug}/ratings/statistics`)
            .then((response) => {
              articles[articles.indexOf(article)].rating = response.data.data;
            })
            .catch(() => {
              articles[articles.indexOf(article)].rating = { allUsers: 0, statistics: [] };
            });
          callback();
        },
        () => {
          dispatch({ type: SEARCH_ARTICLE, searchData: articles });
        });
      })
      .catch((error) => {
        dispatch({ type: SEARCH_ERROR, error });
      });
  }
};
