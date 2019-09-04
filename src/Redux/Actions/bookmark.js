import axios from '../../configs/axios';
import actions from './index';

const { GET_BOOKMARK, NO_BOOKMARK, BOOKMARK } = actions;

export default {
  getBookMarks: username => (dispatch) => {
    axios
      .get(`/api/bookmarks/${username}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then(response => dispatch({ type: GET_BOOKMARK, payload: response.data.data.bookmarks }))
      .catch(() => dispatch({ type: NO_BOOKMARK }));
  },
  bookmark: slug => (dispatch) => {
    axios
      .post(`/api/bookmarks/${slug}`,
        {},
        { headers: { Authorization: localStorage.getItem('token') } })
      .then(response => dispatch({ type: BOOKMARK, payload: response.data.message }));
  }
};
