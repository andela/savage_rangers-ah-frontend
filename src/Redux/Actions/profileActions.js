import axios from '../../configs/axios';
import types from '.';

const { GET_PROFILE, CATCH_ERROR } = types;

export default {
  getProfile: (token, username) => (dispatch) => {
    axios
      .get(`/api/profiles/${username}`, { headers: { token } })
      .then((res) => {
        dispatch({ type: GET_PROFILE, payload: res.data });
      })
      .catch((error) => {
        const errorObject = error.response.data.errors;
        const errorMessage = errorObject[Object.getOwnPropertyNames(errorObject)[0]];
        dispatch({ type: CATCH_ERROR, payload: errorMessage });
      });
  }
};
