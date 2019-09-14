import each from 'async/each';
import axios from '../../configs/axios';
import types from '.';
import calculateAverage from '../../Helpers/calculateAverageRating';

const {
  GET_ARTICLE_RATINGS,
  GET_ARTICLE_RATINGS_ERROR,
  SHOW_USERS_FOR_RATINGS,
  RATE_ARTICLE,
  RATE_ARTICLE_ERROR
} = types;

export default {
  getRatings: slug => (dispatch) => {
    axios
      .get(`api/articles/${slug}/ratings/statistics`)
      .then((res) => {
        res.data.average = calculateAverage(res.data.data.statistics);
        each(res.data.data.statistics,
          (item, callback) => {
            axios
              .get(`api/articles/${slug}/${item.rating}/users?limit=7&offset=0`)
              .then((result) => {
                res.data.data.statistics[res.data.data.statistics.indexOf(item)].users = [
                  `${result.data.paginationDetails.pages}`,
                  result.data.data
                ];
                const raminingPages = new Array(result.data.paginationDetails.pages - 1);
                let newOffset = 0;
                each(raminingPages,
                  (page, callback_) => {
                    newOffset += 7;
                    axios
                      .get(`api/articles/${slug}/${item.rating}/users?limit=7&offset=${newOffset}`)
                      .then((result_) => {
                        res.data.data
                          .statistics[res.data.data.statistics.indexOf(item)]
                          .users.push(result_.data.data);
                      });
                    callback_();
                  },
                  () => {});
                callback();
              })
              .catch(() => callback());
          },
          () => {
            dispatch({ type: GET_ARTICLE_RATINGS, payload: res.data });
          });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: GET_ARTICLE_RATINGS_ERROR, payload: errorMessage });
      });
  },

  showUsersForRating: areShown => dispatch => dispatch({
    type: SHOW_USERS_FOR_RATINGS, payload: areShown
  }),
  rate: (rating, slug, token) => dispatch => new Promise((resolve, reject) => {
    const data = { rating };
    axios
      .post(`api/articles/${slug}/rating`, data, { headers: { authorization: token } })
      .then((res) => {
        resolve(dispatch({ type: RATE_ARTICLE, payload: res.data.message }));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const errorObject = error.response.data.errors;
          const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
          reject(dispatch({ type: RATE_ARTICLE_ERROR, payload: errorMessage }));
        } else reject(dispatch({ type: RATE_ARTICLE_ERROR, payload: error.response }));
      });
  })
};
