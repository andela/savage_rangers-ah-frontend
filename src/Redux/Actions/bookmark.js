import axios from '../../configs/axios';
import actions from './index';

const { HAS_BOOKMARKED, NOT_BOOKMARKED, BOOKMARK } = actions;

export default {
  hasBookmarked: slug => (dispatch) => {
    axios
      .get(`/api/bookmarks/bookmarked/${slug}`, { headers: { Authorization: localStorage.getItem('token') } })
      .then(() => dispatch({ type: HAS_BOOKMARKED }))
      .catch(() => dispatch({ type: NOT_BOOKMARKED }));
  },
  bookmark: slug => (dispatch) => {
    axios
      .post(`/api/bookmarks/${slug}`,
        {},
        { headers: { Authorization: localStorage.getItem('token') } })
      .then(response => dispatch({ type: BOOKMARK, payload: response.data.message }));
  }
};
