import async from 'async';
import actions from '.';
import axios from '../../configs/axios';

const token = localStorage.getItem('token');
export default offset => async (dispatch) => {
  try {
    const { data: authorsData } = await axios.get(`/api/authors?offset=${offset}&limit=10`, { headers: { Authorization: token } });
    const { authors, paginationDetails } = authorsData;
    async.each(authors,
      async (author, callback) => {
        try {
          const { data: followers } = await axios.get(`/api/profiles/follower/${author.username}`, { headers: { Authorization: token } });
          authors[authors.indexOf(author)].followers = followers.data.followers;
        } catch (error) {
          authors[authors.indexOf(author)].followers = [{}];
        }
        callback();
      },

      () => {
        dispatch({
          type: actions.FETCH_AUTHORS_PROFILE_SUCCESS,
          payload: { authors, paginationDetails }
        });
      });
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: actions.FETCH_AUTHORS_PROFILE_FAIL, payload: { data } });
  }
};
