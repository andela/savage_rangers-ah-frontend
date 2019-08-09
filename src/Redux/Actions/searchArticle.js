import async from 'async';
import axios from '../../configs/axios';
import actions from '.';

const { SEARCH_ARTICLE } = actions;

export default {
  searchArticles: (filter, input) => (dispatch) => {
    console.log('====================================');
    console.log(filter);
    console.log(input);
    console.log('====================================');
    axios
      .get(`api/articles/search?${input}=${filter}`)
      .then((res) => {
        // //   const paginationDetails = res.data.result.pagedArticles;
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
          // articles.pagination = paginationDetails;
          dispatch({ type: SEARCH_ARTICLE, searchData: articles });
          console.log(articles);
        });
      })
      .catch((error) => {
        // console.log('====================================');
        // console.log(error);
        // console.log('====================================');
        dispatch({ type: SEARCH_ARTICLE, error });
      });
  }
};
