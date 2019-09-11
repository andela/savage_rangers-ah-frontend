import actions from './index';
import axios from '../../configs/axios';

export default {
  unfollow: username => async (dispatch) => {
    axios
      .delete(`/api/profiles/${username}/unfollow`, { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: actions.UNFOLLOW, payload: response.data });
      });
  },
  follow: username => async (dispatch) => {
    axios
      .post(`/api/profiles/${username}/follow`,
        {},
        { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: actions.FOLLOW, payload: response.data });
      });
  }
};
