import async from 'async';
import axios from '../../configs/axios';
import actions from '.';

const { SEARCH_ARTICLE, SEARCH_ERROR } = actions;

export default {
  searchArticles: (filter, input, paginate) => (dispatch) => {
    axios
      .get(`/api/articles/search?${input}=${filter}&&offset=${paginate}&&limit=10`)
      .then((res) => {
        const { paginationDetails } = res.data;
        const articles = res.data.articles.rows;
        async.each(articles, async (article, callback) => {
          await axios
            .get(`/api/articles/${article.slug}/stats`)
            .then((response) => {
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
          articles.pagination = paginationDetails;
          dispatch({ type: SEARCH_ARTICLE, searchData: articles });
        });
      })
      .catch((error) => {
        dispatch({ type: SEARCH_ERROR, error });
      });
  }
};
