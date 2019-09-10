import types from '.';
import axios from '../../configs/axios';

const { SIGNOUT, SIGNOUT_ERROR } = types;

export default token => dispatch => axios
  .get('api/users/signout', { headers: { Authorization: token } })
  .then((res) => {
    dispatch({ type: SIGNOUT, payload: res.data });
  })
  .catch((error) => {
    dispatch({ type: SIGNOUT_ERROR, payload: error.response.data });
  });
