import types from '.';
import axios from '../../../configs/axios';

const { REGISTER, CATCH_ERROR } = types;

export default {
  register: data => dispatch => axios
    .post('/api/users/signup', { ...data })
    .then((response) => {
      const { user } = response.data;
      dispatch({ type: REGISTER, payload: user });
    })
    .catch((error) => {
      if (error.response.data.errors) {
        const { email, username } = error.response.data.errors;
        const message = email || username;
        dispatch({ type: CATCH_ERROR, payload: { message } });
      } else {
        const { message } = error.response.data;
        dispatch({ type: CATCH_ERROR, payload: { message } });
      }
    })
};
